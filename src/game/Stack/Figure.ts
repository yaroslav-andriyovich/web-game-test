import {CellConfig, FigureModel} from "./Configs";

export class Figure extends Phaser.GameObjects.Container {
    public readonly model: FigureModel;
    private imageParts!: Phaser.GameObjects.Image[][];

    constructor(scene: Phaser.Scene, x: number, y: number, model: FigureModel) {
        super(scene, x, y);

        this.model = model;

        this.createParts();

        this.setSize(this.getBounds().width, this.getBounds().height);
        this.scene.add.existing(this);
    }

    public get parts() {
        return this.imageParts;
    }

    private createParts() {
        this.imageParts = [];

        for (let i= 0; i < this.model.parts.length; i++) {
            this.imageParts[i] = [];

            for (let j= 0; j < this.model.parts[i].length; j++) {
                if (this.model.parts[i][j] == 0)
                    continue;

                const size = CellConfig.cellSize;
                const offset = CellConfig.cellOffset;
                const x = j * (offset + size);
                const y = i * (offset + size);

                const cell = this.scene.add.image(x, y, this.model.textureKey);

                cell.setDisplaySize(size, size);
                cell.setOrigin(0);

                this.imageParts[i][j] = cell;

                this.add(cell);
            }
        }
    }
}