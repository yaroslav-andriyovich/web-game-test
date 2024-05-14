import {Game} from "phaser";
import AnchorPlugin from "phaser3-rex-plugins/plugins/anchor-plugin";
import DragPlugin from "phaser3-rex-plugins/plugins/drag-plugin";
import {MenuScene, TicTacToe, Stack} from "./game/scenes";

const gameConfig : Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 720,
    height: 720,
    parent: 'game-container',
    backgroundColor: '#fff',
    scene: [
        MenuScene,
        TicTacToe,
        Stack
    ],
    plugins: {
        global: [
            {
                key: 'rexAnchor',
                plugin: AnchorPlugin,
                start: true
            },
            {
                key: 'rexDrag',
                plugin: DragPlugin,
                start: true
            }
        ]
    }
};

const game = new Game(gameConfig);