import "phaser";
import { BootScene, GameScene } from './game/scenes';

const config = {
    type: Phaser.AUTO,
    width: 720,
    height: 480,
    parent: 'game-container',
    backgroundColor: '#fff',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        BootScene,
        GameScene
    ]
};

window.addEventListener("load", () => new Phaser.Game(config));