const updateRecordScore = (score, recordScore, recordScoreText) => {
  if (score > recordScore) {
    window.localStorage.setItem("recordScore", score);
    recordScore = score;
    recordScoreText.setText(`Record Score: ${recordScore}`);
  }
};

const generateRandomCoordinates = (math) => {
  let x = math.Between(10, 1590);
  let y = 0;
  return [x, y];
};

const collectStar = (
  player,
  star,
  stars,
  bombs,
  score,
  scoreText,
  scene,
  stopBombs
) => {
  const starSound = scene.sound.add("collectStar", { volume: 1 });
  const bombSound = scene.sound.add("bombFalling", { volume: 0.75 });
  star.disableBody(true, true);
  starSound.play();
  score += 10;
  scoreText.setText(`Score: ${score}`);
  if (stars.countActive(true) === 0 && !bombs?.body?.allowGravity) {
    stars.children.iterate(function (child) {
      child.enableBody(true, child.x, 0, true, true);
      bombSound.play();
    });

    let x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);
    if (!scene.hitStopBombs) {
      const bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      if (
        bombs.countActive(true) % 3 === 0 &&
        stopBombs.countActive(true) === 0
      ) {
        const [stopBombX, stopBombY] = generateRandomCoordinates(Phaser.Math);
        stopBombs.create(stopBombX, stopBombY, "stopBombs");
      }
    }
  }
  updateRecordScore(score, scene.recordScore, scene.recordScoreText);
  return score;
};

const hitBomb = (
  player,
  bomb,
  scene,
  gameOver,
  gameOverText,
  restartButton
) => {
  const gameOverSound = scene.sound.add("gameOverSound", { volume: 0.75 });
  if (!scene.isImmortal) {
    scene.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");
    scene.gameOver = true;
    gameOverText.setVisible(true);
    restartButton.setVisible(true);
    gameOverSound.play();
  }
};

function hitImmortal(scene, player) {
  scene.isImmortal = true;
  player.setTint(0x32cd32);
  let blinkInterval;
  setTimeout(() => {
    blinkInterval = setInterval(() => {
      player.setTint(player.tintTopLeft === 0x32cd32 ? 0xffffff : 0x32cd32);
    }, 300);
  }, 4000);
  setTimeout(() => {
    clearInterval(blinkInterval);
    player.clearTint();
    scene.isImmortal = false;
  }, 7000);
}

const hitSpeedUp = (scene) => {
  scene.isSpeedUp = true;
  setTimeout(() => {
    scene.isSpeedUp = false;
  }, 5000);
};

function hitStopBombs(scene, __, group) {
  // Guardar el estado original de cada cuerpo
  scene.hitStopBombs = true;
  scene.bombs.children.entries.forEach((bomb) => {
    bomb.body.originalVelocity = bomb.body.velocity.clone();

    // "Congelar" el cuerpo
    bomb.body.setVelocity(0);
    bomb.body.allowGravity = false;
  });

  // Programar el "descongelamiento" después de 5 segundos
  scene.time.delayedCall(5000, () => {
    scene.bombs.children.entries.forEach((bomb) => {
      bomb.body.allowGravity = true;
      scene.hitStopBombs = false;
      // Restaurar el estado original
      bomb.body.setVelocity(
        bomb.body.originalVelocity.x,
        bomb.body.originalVelocity.y
      );

      // Limpiar las propiedades temporales
      delete bomb.body.originalVelocity;
    });
  });
}

// Uso:
// Asumiendo que tienes un grupo dinámico llamado 'miGrupoDinamico'
// y quieres congelarlo cuando ocurra cierto evento:

const powerUps = {
  immortal: hitImmortal,
  speedUp: hitSpeedUp,
  stopBombs: hitStopBombs,
};

const hitPowerUp = (key, player, powerUp, powerUpGroup, scene) => {
  const powerUpSound = scene.sound.add("collectPowerUp", { volume: 0.75 });
  powerUpSound.play();
  powerUp.disableBody(true, true);
  if (key !== "stopBombs") {
    setTimeout(() => {
      if (powerUpGroup.countActive(true) === 0) {
        powerUpGroup.children.iterate(function (child) {
          child.enableBody(true, Phaser.Math.Between(10, 790), 0, true, true);
        });
      }
    }, 10000);
  }
  powerUps[key](scene, player, powerUpGroup);
};

export {
  updateRecordScore,
  collectStar,
  hitBomb,
  hitPowerUp,
  generateRandomCoordinates,
};
