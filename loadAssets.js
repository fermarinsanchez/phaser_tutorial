export const loadGameAssets = (load) => {
    load.image('sky', 'assets/sky.png');

    load.image('ground', 'assets/platform.png');

    load.image('star', 'assets/star.png');

    load.image('bomb', 'assets/bomb.png');

    load.image('immortal', 'assets/cristalv.gif');

    load.image("speedUp", "assets/Bolt.png");

    load.spritesheet('dude',
        'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}