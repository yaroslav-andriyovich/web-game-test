import {CellConfig, Textures} from "./Configs";

export class BoardCell extends Phaser.GameObjects.Container {
    private background!: Phaser.GameObjects.Image;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.createBackground();

        this.scene.add.existing(this);
    }

    private createBackground() {
        const size = CellConfig.cellSize;

        this.background = this.scene.add.image(0, 0, Textures.bg.key);
        this.background.setTintFill(0x354369, 0x354369, 0x28334f, 0x28334f);
        this.background.setDisplaySize(size, size);
        this.background.setOrigin(0);

        this.add(this.background);
    }
}