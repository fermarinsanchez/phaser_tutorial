class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        this.load.image('background', 'assets/menu-background.png');
        this.load.image('start-button', 'assets/start_button.png');

    }

    create() {
        // Fondo negro
        this.add.image(0, 0, 'background').setScale(2).setOrigin(0, 0);

        // const graphics = this.add.graphics();
        // graphics.fillStyle(0x000000, 1);
        // graphics.fillRect(0, 0, 800, 600);

        // Título del juego
        this.add.text(400, 300, 'STARS KEEPER', {
            fontSize: '82px',
            fill: '#ffffff',
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            stroke: '#ffff',
            strokeThickness: 2,
            shadow: {
                offsetX: 2,
                offsetY: 2,
                color: 'grey',
                blur: 10,
                stroke: true,
                fill: true,
            },
            padding: {
                left: 10,
                right: 10,
                top: 5,
                // bottom: 5
            },
        }).setOrigin(0.5);

        // Botón de inicio
        const startButton = this.add.image(400, 400, 'start-button')
            .setInteractive()
            .setScale(0.2);  // Esto cambia el tamaño al 50% del original

        startButton.on('pointerdown', () => {
            this.scene.start('MainScene');
        });

    }
}

export default MenuScene;