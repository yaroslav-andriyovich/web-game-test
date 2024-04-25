import {CellConfig} from "./CellConfig";
import {Pieces} from "./Pieces";

export class Cell extends Phaser.GameObjects.Container {
    private readonly defaultImageAlpha: number = 1;
    private readonly overImageAlpha: number;

    private piece: Pieces = Pieces.None;
    private image: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, position: Phaser.Math.Vector2, config: CellConfig) {
        super(scene, position.x, position.y);

        this.overImageAlpha = config.overImageAlpha;
        this.image = this.createImage();

        this.setSize(config.width, config.height);
        this.add(this.image);
        this.setInteractive();
        this.scene.add.existing(this);
        //this.scene.input.enableDebug(this);
    }

    public getPiece(): Pieces {
        return this.piece;
    }

    public onPointerOver(textureKey: string) {
        this.setImageTexture(textureKey, this.overImageAlpha);
    }

    public onPointerOut() {
        this.image.setVisible(false);
    }

    public setPiece(piece: Pieces, textureKey: string) {
        this.piece = piece;

        if (this.piece != Pieces.None) {
            this.setImageTexture(textureKey);
        } else
            this.image.setVisible(false);

        this.disableInteractive();
    }

    private createImage() {
        return this.scene.add.image(0, 0, '')
            .setDisplaySize(this.imageWidth, this.imageHeight)
            .setOrigin(0.5)
            .setVisible(false);
    }

    private setImageTexture(textureKey: string, alpha?: number) {
        this.image.setTexture(textureKey);
        this.image.setDisplaySize(this.imageWidth, this.imageHeight);
        this.image.setAlpha(alpha ? alpha : this.defaultImageAlpha);
        this.image.setVisible(true);
    }

    private get imageWidth() {
        return this.width / 1.5;
    }

    private get imageHeight() {
        return this.height / 1.5;
    }
}