radio.onReceivedNumber(function (receivedNumber) {
    led.plot(receivedNumber / 10, receivedNumber % 10)
})
input.onGesture(Gesture.TiltLeft, function () {
    sprite.change(LedSpriteProperty.X, -1)
})
input.onButtonPressed(Button.A, function () {
    sprite.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    sprite.change(LedSpriteProperty.Y, 1)
})
input.onGesture(Gesture.TiltRight, function () {
    sprite.change(LedSpriteProperty.X, 1)
})
let sprite: game.LedSprite = null
radio.setGroup(1)
radio.setTransmitPower(7)
sprite = game.createSprite(2, 2)
loops.everyInterval(1000, function () {
    pins.analogWritePin(AnalogPin.P0, (256 - input.lightLevel()) * 4)
    radio.sendNumber(sprite.get(LedSpriteProperty.X) * 10 + sprite.get(LedSpriteProperty.Y))
})
