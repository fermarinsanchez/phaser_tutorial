const updateRecordScore = (score, recordScore, recordScoreText) => {
    if (score > recordScore) {
        window.localStorage.setItem('recordScore', score);
        recordScore = score;
        recordScoreText.setText(`Record Score: ${recordScore}`);
    }
}

const collectStar = (player, star, stars, bombs, score, scoreText, scene) => {
    star.disableBody(true, true);
    score += 10;
    scoreText.setText(`Score: ${score}`);
    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });

        let x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        const bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
    updateRecordScore(score, scene.recordScore, scene.recordScoreText);
    return score;
}

const hitBomb = (player, bomb, scene, gameOver, gameOverText, restartButton) => {
    if (!scene.isImmortal) {
        scene.physics.pause();
        player.setTint(0xff0000);
        player.anims.play('turn');
        gameOver = true;
        gameOverText.setVisible(true);
        restartButton.setVisible(true);
    }
}

const hitPowerUp = (player, immortal, scene) => {
    immortal.disableBody(true, true);
    scene.isImmortal = true;
    player.setTint(0x32CD32);  // Verde lima
    setTimeout(() => {
        scene.isImmortal = false;
        player.clearTint();
        scene.physics.add.collider(player, scene.bombs, hitBomb, null, scene);
    }, 10000);
}

export { updateRecordScore, collectStar, hitBomb, hitPowerUp }
