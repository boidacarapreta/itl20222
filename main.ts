radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber >= bairro * 10 && receivedNumber <= bairro * 10 + 9) {
        comando = receivedNumber % (bairro * 10)
        if (comando == 1) {
            pins.digitalWritePin(DigitalPin.P0, 1)
        }
        basic.showNumber(comando)
    }
})
let comando = 0
let bairro = 0
bairro = 1
basic.showNumber(bairro)
