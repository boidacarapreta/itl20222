def on_received_number(receivedNumber):
    if receivedNumber == 50:
        pins.digital_write_pin(DigitalPin.P0, 0)
        sprite.change(LedSpriteProperty.Y, 1)
    elif receivedNumber == 51:
        pins.digital_write_pin(DigitalPin.P0, 1)
        sprite.change(LedSpriteProperty.X, 1)
    elif receivedNumber == 52:
        pins.digital_write_pin(DigitalPin.P1, 0)
        sprite.change(LedSpriteProperty.X, -1)
    elif receivedNumber == 53:
        pins.digital_write_pin(DigitalPin.P1, 1)
        sprite.change(LedSpriteProperty.Y, -1)


radio.on_received_number(on_received_number)

sprite: game.LedSprite = None
canal = 100
radio.set_group(canal)
sprite = game.create_sprite(2, 2)
