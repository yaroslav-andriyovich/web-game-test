import {CellConfig, FigureModel} from "./Configs";

export class Figure extends Phaser.GameObjects.Container {
    public readonly model: FigureModel;
    public readonly index: number;

    private interactZone!: Phaser.GameObjects.Rectangle;
    private imageParts!: Phaser.GameObjects.Image[][];

    constructor(scene: Phaser.Scene, x: number, y: number, model: FigureModel, index: number) {
        super(scene, x, y);

        this.model = model;
        this.index = index;

        this.createParts();
        this.createInteractZone();

        this.scene.add.existing(this);
    }

    public get parts() {
        return this.imageParts;
    }

    public activate() {
        this.enableInteractive();
        this.alpha = 1;
    }

    public deactivate() {
        this.disableInteractive();
        this.alpha = 0.4;
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

    private createInteractZone() {
        let bounds = this.getBounds();
        const width = bounds.width;
        const height = bounds.height;

        this.interactZone = this.scene.add.rectangle(0, 0, width, height);
        this.enableInteractive();
    }

    private enableInteractive() {
        this.setInteractive(this.interactZone, Phaser.Geom.Rectangle.Contains);
    }
}