from dotenv import load_dotenv
from os import getenv
import serial
import pygame


def main():
    load_dotenv()
    #
    # Definir as variáveis de video e porta serial
    getenv('SDL_VIDEODRIVER', default='dummy')
    serial_port = getenv('SERIAL_PORT', default='/dev/ttyACM0')
    serial_speed = getenv('SERIAL_SPEED', default='115200')
    try:
        rasp = serial.Serial(serial_port, int(serial_speed))
    except:
        rasp = None
    #
    # Iniciar o pygame e relógio interno
    pygame.init()
    clock = pygame.time.Clock()
    #
    # Detectar todos os joysticks e iniciá-los
    joysticks = [pygame.joystick.Joystick(
        i) for i in range(pygame.joystick.get_count())]
    for joy in joysticks:
        joy.init()
    #
    # Entrar em loop (até haver algum problema com joystick)
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.JOYBUTTONDOWN:
                for j in range(len(joysticks)):
                    # 
                    # D-pad
                    # botão 11: esquerda
                    # botão 12: direita
                    # botão 13: cima
                    # botão 14: baixo
                    dpad = ''
                    for botao in range(11,15):
                        dpad += str(int(joysticks[j].get_button(botao)))
                    if dpad == '1010':
                        bairro = '1'
                    elif dpad == '0010':
                        bairro = '2'
                    elif dpad == '0110':
                        bairro = '3'
                    elif dpad == '1000':
                        bairro = '4'
                    elif dpad == '0100':
                        bairro = '6'
                    elif dpad == '1001':
                        bairro = '7'
                    elif dpad == '0001':
                        bairro = '8'
                    elif dpad == '0101':
                        bairro = '9'
                    else:
                        bairro = '5'
                    #
                    # Comandos
                    # botão 0: A
                    # botão 1: B
                    # botão 2: X
                    # botão 3: Y
                    # botão 4: SL
                    # botão 5: SR
                    # botão 6: Back
                    # botão 7: Start
                    # botão 8: Xbox
                    if joysticks[j].get_button(0):
                        comando = '0' # liga energia do bairro
                    elif joysticks[j].get_button(1):
                        comando = '1' # desliga energia do bairro
                    else:
                        comando = None
                    #
                    # Escrever na porta serial (ou em stdout)
                    if comando:
                        mensagem = bairro + comando
                        if rasp:
                            rasp.write(mensagem.encode())
                        else:
                            print(mensagem)
        #
        # Aguardar 1 segundo
        clock.tick(1000)
        #
        # Se todos os joysticks pararem, parar o loop
        if pygame.joystick.get_count() == 0:
            running = False
    #
    # Fechar o pygame
    pygame.quit()


if __name__ == '__main__':
    main()
