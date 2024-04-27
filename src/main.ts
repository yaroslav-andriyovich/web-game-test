import "phaser";
import { BootScene, GameScene } from './game/scenes';

const config : Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    parent: 'game-container',
    backgroundColor: '#fff',
    scene: [
        BootScene,
        GameScene
    ]
};

window.addEventListener("load", () => new Phaser.Game(config));