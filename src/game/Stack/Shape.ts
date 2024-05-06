import {CellConfig, ShapeModel} from "./Configs";

export class Shape extends Phaser.GameObjects.Container {
    private model: ShapeModel;
    private grid!: Phaser.GameObjects.Image[][];

    constructor(scene: Phaser.Scene, x: number, y: number, model: ShapeModel) {
        super(scene, x, y);

        this.model = model;

        this.createGrid();

        this.scene.add.existing(this);
    }

    private createGrid() {
        this.grid = [];

        for (let i= 0; i < this.model.cells.length; i++) {
            this.grid[i] = [];

            for (let j= 0; j < this.model.cells[i].length; j++) {
                if (this.model.cells[i][j] == 0)
                    continue;

                const size = CellConfig.cellSize;
                const offset = CellConfig.cellOffset;
                const x = j * (offset + size);
                const y = i * (offset + size);

                const cell = this.scene.add.image(x, y, this.model.textureKey);

                cell.setDisplaySize(size, size);
                cell.setOrigin(0);

                this.grid[i][j] = cell;

                this.add(cell);
            }
        }
    }
}