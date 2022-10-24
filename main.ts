radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 0) {
        remoto.change(LedSpriteProperty.X, -1)
    } else if (receivedNumber == 1) {
        remoto.change(LedSpriteProperty.X, 1)
    } else if (receivedNumber == 10) {
        remoto.change(LedSpriteProperty.Y, -1)
    } else if (receivedNumber == 11) {
        remoto.change(LedSpriteProperty.Y, 1)
    } else if (receivedNumber == 99) {
        game.setScore(0)
        game.gameOver()
    }
})
input.onGesture(Gesture.TiltLeft, function () {
    local.change(LedSpriteProperty.X, -1)
    testar_colisão(0)
})
input.onButtonPressed(Button.A, function () {
    local.change(LedSpriteProperty.Y, -1)
    testar_colisão(10)
})
function testar_colisão (movimento: number) {
    game.addScore(1)
    if (local.isTouching(remoto)) {
        radio.sendNumber(99)
        game.gameOver()
    } else {
        radio.sendNumber(movimento)
    }
}
input.onButtonPressed(Button.B, function () {
    local.change(LedSpriteProperty.Y, 1)
    testar_colisão(11)
})
input.onGesture(Gesture.TiltRight, function () {
    local.change(LedSpriteProperty.X, 1)
    testar_colisão(1)
})
let remoto: game.LedSprite = null
let local: game.LedSprite = null
radio.setGroup(1)
radio.setTransmitPower(7)
local = game.createSprite(2, 2)
remoto = game.createSprite(2, 2)
