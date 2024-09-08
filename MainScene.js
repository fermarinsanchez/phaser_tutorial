import { animations } from './animations.js';
import { loadGameAssets } from './loadAssets.js';
import {
    updateRecordScore,
    collectStar,
    hitBomb,
    hitPowerUp,
    generateRandomCoordinates,
} from './helpers.js';
import { POWERUPS } from "./constants.js";

let platforms;
let player;
let cursors;
let stars;
let score = 0;
let scoreText;
let recordScore = 0;
let recordScoreText;
let bombs;
let gameOver = false;
let immortal;
let isImmortal = false;
let gameOverText;
let restartButton;
let speedUp;
let stopBombs;

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        loadGameAssets(this.load);
    }

    create() {
        // Reiniciar variables globales
        this.gameOver = false;
        score = 0;
        recordScore = window.localStorage.getItem("recordScore") || 0;
        this.add.image(0, 0, "sky").setOrigin(0, 0);
        scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            fill: "#000",
        });
        recordScoreText = this.add.text(16, 54, `Record Score: ${recordScore}`, {
            fontSize: "32px",
            fill: "#000",
        });
        // Inicialización de items del juego
        player = this.physics.add.sprite(400, 450, "dude");
        immortal = this.physics.add.group();
        stars = this.physics.add.group();
        speedUp = this.physics.add.group();
        stopBombs = this.physics.add.group();
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, "ground").setScale(2).refreshBody();
        platforms.create(600, 400, "ground");
        platforms.create(50, 250, "ground");
        platforms.create(750, 220, "ground");
        const [immortalX, immortalY] = generateRandomCoordinates(Phaser.Math);
        const [speedUpX, speedUpY] = generateRandomCoordinates(Phaser.Math);
        const [stopBombX, stopBombY] = generateRandomCoordinates(Phaser.Math);
        immortal.create(immortalX, immortalY, "immortal");
        speedUp.create(speedUpX, speedUpY, "speedUp");
        bombs = this.physics.add.group();
        this.bombs = bombs;
        this.hitStopBombs = false;
        // Colisiones
        this.physics.add.collider(
            immortal,
            player,
            (player, powerUp) =>
                hitPowerUp(POWERUPS.IMMORTAL, player, powerUp, immortal, this),
            null,
            this
        );
        this.physics.add.collider(
            speedUp,
            player,
            (player, powerUp) =>
                hitPowerUp(POWERUPS.SPEEDUP, player, powerUp, speedUp, this),
            null,
            this
        );
        this.physics.add.collider(
            stopBombs,
            player,
            (player, powerUp) =>
                hitPowerUp(POWERUPS.STOPBOMBS, player, powerUp, stopBombs, this),
            null,
            this
        );
        this.physics.add.collider(bombs, platforms);
        this.physics.add.collider(immortal, platforms);
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platforms);
        this.physics.add.collider(speedUp, platforms);
        this.physics.add.collider(stopBombs, platforms);
        animations(this);

        // Reemplazar la creación del grupo de estrellas con esto:

        // Crear una función para añadir una estrella
        const addStar = (x) => {
            const star = stars.create(x, 0, "star");
            star.setBounceY(0.2);
            // star.setVelocityX(Phaser.Math.FloatBetween(-50, 50));
        };

        // Añadir estrellas con retraso
        for (let i = 0; i < 1; i++) {
            this.time.delayedCall(i * 100, addStar, [12 + i * 70], this);
        }

        // Colisiones de estrellas con el suelo
        this.physics.add.collider(stars, platforms);

        // Colisiones de estrellas con el jugador
        this.physics.add.overlap(
            player,
            stars,
            (player, star) => {
                score = collectStar(
                    player,
                    star,
                    stars,
                    bombs,
                    score,
                    scoreText,
                    this,
                    stopBombs
                );
            },
            null,
            this
        );

        this.physics.add.overlap(
            player,
            immortal,
            (player, powerUp) => {
                hitPowerUp(player, powerUp, immortal, bombs, score, scoreText, this);
            },
            null,
            this
        );
        console.log("bombs", bombs);
        // Crear el texto de Game Over (inicialmente oculto)
        gameOverText = this.add.text(400, 300, "GAME OVER", {
            fontSize: "64px",
            fill: "#000",
        });
        gameOverText.setOrigin(0.5);
        gameOverText.setVisible(false);

        this.physics.add.collider(
            player,
            bombs,
            (player, bomb) =>
                hitBomb(player, bomb, this, gameOver, gameOverText, restartButton),
            () => !this.isImmortal,
            this
        );
        // Crear el botón de reinicio (inicialmente oculto)
        restartButton = this.add.text(400, 400, "Jugar de nuevo", {
            fontSize: "32px",
            fill: "#000",
            backgroundColor: "#fff",
            padding: { x: 10, y: 5 },
            borderRadius: 10,
            borderWidth: 2,
            borderColor: "#000",
        });
        restartButton.setOrigin(0.5);
        restartButton.setInteractive({ useHandCursor: true });
        restartButton.on("pointerdown", () => this.scene.restart());
        restartButton.setVisible(false);
    }

    update() {
        if (this.gameOver) {
            return;
        }
        // console.log("gameOver", gameOver);
        cursors = this.input.keyboard.createCursorKeys();
        updateRecordScore(score, recordScore, recordScoreText);

        if (cursors.left.isDown) {
            player.setVelocityX(this.isSpeedUp ? -320 : -160);

            player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(this.isSpeedUp ? 320 : 160);

            player.anims.play("right", true);
        } else {
            player.setVelocityX(0);

            player.anims.play("turn");
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }
    }
}

export default MainScene;
