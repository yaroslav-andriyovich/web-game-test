import {CellConfig, FigureModel} from "./Configs";
import GridSizer from "phaser3-rex-plugins/templates/ui/gridsizer/GridSizer";

export class Figure extends Phaser.GameObjects.Container {
    public readonly model: FigureModel;
    public readonly index: number;

    private imageParts!: Phaser.GameObjects.Image[][];
    private gridSizer!: GridSizer;

    constructor(scene: Phaser.Scene, x: number, y: number, model: FigureModel, index: number) {
        super(scene, x, y);

        this.model = model;
        this.index = index;

        this.createGridSizer();
        this.createParts();

        this.setSize(this.getBounds().width, this.getBounds().height);
        this.scene.add.existing(this);
    }

    public get parts() {
        return this.imageParts;
    }

    public activate() {
        this.setInteractive();
        this.alpha = 1;
    }

    public deactivate() {
        this.disableInteractive();
        this.alpha = 0.4;
    }

    private createGridSizer() {
        const size = CellConfig.cellSize;
        const offset = CellConfig.cellOffset;

        const rowSize = this.model.parts.length;
        const columnSize = this.model.parts.reduce((maxLength, nestedArray) => {
            return Math.max(maxLength, nestedArray.length);
        }, 0);

        const originOffsetX = ((size / 2) * columnSize) - offset;
        const originOffsetY = ((size / 2) * rowSize) - offset;

        this.gridSizer = this.scene.rexUI.add.gridSizer({
            x: -originOffsetX, y: -originOffsetY,
            column: columnSize, row: rowSize,
            columnProportions: 1, rowProportions: 1,
            space: { column: offset, row: offset }
        }).setOrigin(0);
    }

    private createParts() {
        this.imageParts = [];

        for (let rows = 0; rows < this.model.parts.length; rows++) {
            this.imageParts[rows] = [];

            for (let cols = 0; cols < this.model.parts[rows].length; cols++) {
                if (this.isPartEmpty(rows, cols))
                    continue;

                const part = this.scene.add.image(0, 0, this.model.textureKey);

                part.setDisplaySize(CellConfig.cellSize, CellConfig.cellSize);

                this.gridSizer.add(part, cols, rows, 'center', CellConfig.cellOffset, true);
                this.imageParts[rows][cols] = part;
            }
        }

        this.gridSizer.layout();
        this.add(this.gridSizer);
    }

    private isPartEmpty(row: number, col: number) : boolean {
        return this.model.parts[row][col] == 0;
    }
}