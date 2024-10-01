import MenuScene from "./MenuScene.js";
import MainScene from "./MainScene.js";
import PreStageScene from "./PreStageScene.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [MenuScene, PreStageScene, MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

const game = new Phaser.Game(config);
