import { BootScene, GameScene } from './scenes';

export const GameConfig : Phaser.Types.Core.GameConfig = {
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

export const Textures = {
    pieces: {
        x: { key: 'x', url: './images/x.png' },
        o: { key: 'o', url: './images/o.png' },
    }
}

export type CellConfig = {
    width: number,
    height: number,
    overImageAlpha: number
};

export type GridConfig = {
    rows: number,
    cols: number,
    borderWidth: number,
    borderColor: number,
    cell: CellConfig
};