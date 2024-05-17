import {Game} from "phaser";
import AnchorPlugin from "phaser3-rex-plugins/plugins/anchor-plugin";
import DragPlugin from "phaser3-rex-plugins/plugins/drag-plugin";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin';
import {MenuScene, TicTacToe, Stack} from "./game/scenes";

declare module 'phaser' {
    interface Scene {
        rexUI: UIPlugin;
        rexAnchor: AnchorPlugin;
        rexDrag: DragPlugin;
    }
}

const gameConfig : Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    backgroundColor: '#fff',
    antialias: true,
    disableContextMenu: true,
    autoMobilePipeline: true,
    autoRound: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
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
                mapping: 'rexAnchor',
                start: true
            },
            {
                key: 'rexDrag',
                plugin: DragPlugin,
                mapping: 'rexDrag',
                start: true
            }
        ],
        scene: [
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ]
    }
};

const game = new Game(gameConfig);