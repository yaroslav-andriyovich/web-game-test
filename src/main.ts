import {Game} from "phaser";
import AnchorPlugin from "phaser3-rex-plugins/plugins/anchor-plugin";
import {MenuScene, TicTacToe, Stack} from "./game/scenes";

const gameConfig : Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    parent: 'game-container',
    backgroundColor: '#fff',
    scene: [
        MenuScene,
        TicTacToe,
        Stack
    ],
    plugins: {
        global: [{
            key: 'rexAnchor',
            plugin: AnchorPlugin,
            start: true
        }]
    }
};

const game = new Game(gameConfig);