class PreStageScene extends Phaser.Scene {
  constructor() {
    super("PreStageScene");
  }
  preload() {
    this.load.image("background", "assets/menu-background.png");
    this.load.image("start-button", "assets/start_button.png");
  }

  create() {
    // Fondo negro
    this.add.image(0, 0, "background").setOrigin(0, 0).setScale(1.5);
    this.stageCounter = 1;
    console.log("liveCounter", this.liveCounter);

    // const graphics = this.add.graphics();

    // const graphics = this.add.graphics();
    // graphics.fillStyle(0x000000, 1);
    // graphics.fillRect(0, 0, 800, 600);

    // Título del juego
    this.add
      .text(400, 300, `STAGE ${this.stageCounter}`, {
        fontSize: "82px",
        fill: "#ffffff",
        fontFamily: "Roboto",
        fontWeight: "bold",
        stroke: "#ffff",
        strokeThickness: 2,
        shadow: {
          offsetX: 2,
          offsetY: 2,
          color: "grey",
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
      })
      .setOrigin(0.5);
    this.add
      .text(400, 400, "Lives remaining: 3", { fontSize: "32px" })
      .setOrigin(0.5);
    this.time.delayedCall(3000, () => {
      this.scene.start("MainScene");
    });

    // Botón de inicio
    // const startButton = this.add
    //   .image(400, 400, "start-button")
    //   .setInteractive()
    //   .setScale(0.2); // Esto cambia el tamaño al 50% del original

    // startButton.on("pointerdown", () => {
    //   this.scene.start("MainScene");
    // });
  }
}

export default PreStageScene;
