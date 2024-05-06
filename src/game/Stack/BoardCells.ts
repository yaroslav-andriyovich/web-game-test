import {BoardConfig, CellConfig} from "./Configs";

import {BoardCell} from "./BoardCell";

export class BoardCells extends Phaser.GameObjects.Container {
    public grid!: BoardCell[][];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.createCells();

        this.setSize(this.getBounds().width, this.getBounds().height);
        this.scene.add.existing(this);
    }

    private createCells() {
        this.grid = [];

        for (let i = 0; i < BoardConfig.cellsCount; i++) {
            this.grid[i] = [];

            for (let j = 0; j < BoardConfig.cellsCount; j++) {
                const size = CellConfig.cellSize;
                const offset = CellConfig.cellOffset;
                const x = j * (offset + size);
                const y = i * (offset + size);

                const cell = new BoardCell(this.scene, x, y);

                this.grid[i][j] = cell;

                this.add(cell);
            }
        }
    }
}