import {CellConfig, Textures} from "./Configs";
import {CellFillingData} from "./CellFillingData";

export class BoardCell extends Phaser.GameObjects.Container {
    private readonly emptyKey: string = '';

    private background!: Phaser.GameObjects.Image;
    private fillingImage!: Phaser.GameObjects.Image;
    private filled: boolean;
    private highlighted: boolean;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.createBackground();
        this.createFillingImage();
        this.filled = false;
        this.highlighted = false;

        this.scene.add.existing(this);
    }

    public get isFilled() {
        return this.filled;
    }

    public get isHighlighted() {
        return this.highlighted;
    }

    public fill(figurePart: CellFillingData) {
        this.changeFillingTexture(figurePart);
        this.fillingImage.alpha = 1;
        this.filled = true;
    }

    public highlight(figurePart: CellFillingData) {
        if (this.isFilled)
            return;

        this.changeFillingTexture(figurePart);
        this.fillingImage.alpha = 0.5;
        this.highlighted = true;
    }

    public clear() {
        this.fillingImage.setTexture(this.emptyKey);
        this.fillingImage.setVisible(false);
        this.filled = false;
        this.highlighted = false;
    }

    private createBackground() {
        this.background = this.scene.add.image(0, 0, Textures.bg.key);
        this.background.setDisplaySize(CellConfig.cellSize, CellConfig.cellSize);
        this.background.setOrigin(0);

        this.add(this.background);
    }

    private createFillingImage() {
        this.fillingImage = this.scene.add.image(0, 0, this.emptyKey);
        this.fillingImage.setOrigin(0);
        this.fillingImage.setVisible(false);

        this.add(this.fillingImage);
    }

    private changeFillingTexture(figurePart: CellFillingData) {
        this.fillingImage.setTexture(figurePart.imageKey);
        this.fillingImage.setDisplaySize(CellConfig.cellSize, CellConfig.cellSize);
        this.fillingImage.setVisible(true);
    }
}