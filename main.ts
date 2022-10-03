radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber >= bairro * 10 && receivedNumber <= bairro * 10 + 9) {
        comando = receivedNumber % (bairro * 10)
        if (comando == 0) {
            pins.digitalWritePin(DigitalPin.P0, 0)
        }
        if (comando == 1) {
            pins.digitalWritePin(DigitalPin.P0, 1)
        }
        basic.showNumber(comando)
    }
})
input.onButtonPressed(Button.A, function () {
    if (bairro == 9) {
        bairro = 1
    } else {
        bairro = bairro + 1
    }
    basic.showNumber(bairro)
})
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(bairro * 10 + comando)
    basic.showNumber(bairro * 10 + comando)
})
input.onButtonPressed(Button.B, function () {
    comando = (comando + 1) % 10
    basic.showNumber(comando)
})
let comando = 0
let bairro = 0
radio.setGroup(1)
radio.setTransmitPower(7)
bairro = 1
comando = 0
basic.showNumber(bairro)
