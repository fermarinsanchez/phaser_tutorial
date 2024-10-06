export const loadGameAssets = (load) => {
  //Imagenes

  load.image("sky", "assets/sky.png");

  load.image("ground", "assets/platform.png");

  load.image("star", "assets/star.png");

  load.image("bomb", "assets/bomb.png");

  load.image("immortal", "assets/cristalv.gif");

  load.image("speedUp", "assets/Bolt.png");

  load.image("stopBombs", "assets/Clock.png");

  load.spritesheet("dude", "assets/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });

  //Sonidos

  load.audio("music", "assets/audio_files/Nota.mp3");

  load.audio("jump", "assets/audio_files/jump.wav");

  load.audio("bombFalling", "assets/audio_files/bomb.wav");

  load.audio("collectPowerUp", "assets/audio_files/collectPowerUp.wav");

  load.audio("collectStar", "assets/audio_files/collectStar.wav");

  load.audio("gameOverSound", "assets/audio_files/gameOverSound.wav");
};
