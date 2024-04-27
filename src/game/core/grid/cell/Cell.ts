import {Piece} from "./Piece";
import {CellConfig} from "../../../configs";
import {CellCord} from "./CellCord";

export class Cell extends Phaser.GameObjects.Container {
    public readonly cord: CellCord;
    private readonly defaultImageAlpha: number = 1;
    private readonly overImageAlpha: number;

    private piece: Piece = Piece.None;
    private image!: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, position: Phaser.Math.Vector2, cord: CellCord, config: CellConfig) {
        super(scene, position.x, position.y);

        this.cord = cord;
        this.overImageAlpha = config.overImageAlpha;
        this.setSize(config.width, config.height);
        this.createImage();
        this.setInteractive();
        this.scene.add.existing(this);
        //this.scene.input.enableDebug(this);
    }

    public getPiece(): Piece {
        return this.piece;
    }

    public showPreview(textureKey: string) {
        this.setImageTexture(textureKey, this.overImageAlpha);
    }

    public hidePreview() {
        this.image.setVisible(false);
    }

    public setPiece(piece: Piece, textureKey: string) {
        this.piece = piece;

        if (this.piece != Piece.None) {
            this.setImageTexture(textureKey);
        } else
            this.image.setVisible(false);

        this.disableInteractive();
    }

    public markLose() {
        this.image.setAlpha(0.25);
    }

    private createImage() {
        this.image = this.scene.add.image(0, 0, '')
            .setDisplaySize(this.imageWidth, this.imageHeight)
            .setOrigin(0.5)
            .setVisible(false);

        this.add(this.image);
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