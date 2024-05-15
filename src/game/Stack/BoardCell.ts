import {CellConfig, Textures} from "./Configs";
import {CellCoords} from "../../common/CellCoords";

export class BoardCell extends Phaser.GameObjects.Container {
    private readonly emptyKey: string = '';

    public readonly coords: CellCoords;

    private background!: Phaser.GameObjects.Image;
    private fillingImage!: Phaser.GameObjects.Image;
    private highlighted: boolean;
    private filled: boolean;
    private fillTextureKey!: string;

    constructor(scene: Phaser.Scene, x: number, y: number, coords: CellCoords) {
        super(scene, x, y);

        this.coords = coords;
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

    public get isNotEmpty() {
        return this.filled || this.highlighted;
    }

    public get isEmpty() {
        return !this.filled && !this.highlighted;
    }

    public fill(imageKey: string) {
        this.fillTextureKey = imageKey;
        this.changeFillingTexture(imageKey);
        this.fillingImage.alpha = 1;
        this.highlighted = false;
        this.filled = true;
    }

    public highlight(imageKey: string) {
        if (this.isFilled)
            return;

        this.changeFillingTexture(imageKey);
        this.fillingImage.alpha = 0.4;
        this.highlighted = true;
    }

    public highlightCombo(imageKey: string) {
        this.changeFillingTexture(imageKey);

        if (!this.isHighlighted)
            this.fillingImage.alpha = 1;

        this.highlighted = true;
    }

    public clearHighlighting() {
        if (!this.isHighlighted)
            return;

        if (this.isFilled) {
            this.fillingImage.setTexture(this.fillTextureKey);
        } else {
            this.fillingImage.setVisible(false);
            this.fillingImage.setTexture(this.emptyKey);
        }

        this.highlighted = false;
    }

    public clear() {
        this.fillingImage.setVisible(false);
        this.fillingImage.setTexture(this.emptyKey);
        this.fillTextureKey = this.emptyKey;
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

    private changeFillingTexture(imageKey: string) {
        this.fillingImage.setTexture(imageKey);
        this.fillingImage.setDisplaySize(CellConfig.cellSize, CellConfig.cellSize);
        this.fillingImage.setVisible(true);
    }
}