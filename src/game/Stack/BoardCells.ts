import {BoardConfig, CellConfig} from "./Configs";
import {BoardCell} from "./BoardCell";
import {CellCoords} from "../../common/CellCoords";

export class BoardCells extends Phaser.GameObjects.Container {
    public cells!: BoardCell[][];

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.createCells();

        this.setSize(this.getBounds().width, this.getBounds().height);
        this.setInteractive();
        this.scene.input.enableDebug(this);
        this.scene.add.existing(this);
    }

    public get all() {
        return this.cells;
    }

    private createCells() {
        this.cells = [];

        for (let i = 0; i < BoardConfig.cellsCount; i++) {
            this.cells[i] = [];

            for (let j = 0; j < BoardConfig.cellsCount; j++) {
                const size = CellConfig.cellSize;
                const offset = CellConfig.cellOffset;
                const x = j * (offset + size);
                const y = i * (offset + size);

                const cell = new BoardCell(this.scene, x, y, new CellCoords(i, j));

                this.cells[i][j] = cell;

                this.add(cell);
            }
        }
    }
}