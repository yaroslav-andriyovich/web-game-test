import {Game} from "phaser";
import {MenuScene, TicTacToe} from "./game/scenes";

const gameConfig : Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    parent: 'game-container',
    backgroundColor: '#fff',
    scene: [
        MenuScene,
        TicTacToe
    ]
};

const game = new Game(gameConfig);