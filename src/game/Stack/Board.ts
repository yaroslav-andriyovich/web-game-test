import {BoardConfig} from "./Configs";
import {BoardCells} from "./BoardCells";

export class Board extends Phaser.GameObjects.Container {
    private background!: Phaser.GameObjects.Rectangle;
    private cellsContainer!: BoardCells;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.createBackground();
        this.createCells();
        this.resizeBackground();

        this.scene.add.existing(this);
    }

    private createBackground() {
        this.background = this.scene.add.rectangle(0, 0, 10, 10, 0x141024);
        this.background.setOrigin(0);

        this.add(this.background);
    }

    private createCells() {
        const x = BoardConfig.cellsPadding;
        const y = BoardConfig.cellsPadding;

        this.cellsContainer = new BoardCells(this.scene, x, y);

        this.add(this.cellsContainer);
    }

    private resizeBackground() {
        const width = this.cellsContainer.width + BoardConfig.cellsPadding * 2;
        const height = this.cellsContainer.height + BoardConfig.cellsPadding * 2;

        this.background.setSize(width, height);
    }
}