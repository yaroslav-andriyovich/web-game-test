import {BoardConfig} from "./Configs";
import {BoardCells} from "./BoardCells";
import {CellCoords} from "../../common/CellCoords";

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

    public get cells() {
        return this.cellsContainer.all;
    }

    public highlightCells(fillingData: CellCoords[], textureKey: string) {
        fillingData.forEach((data) => {
            const cell = this.cellsContainer.all[data.row][data.col];

            cell.highlightMove(textureKey);
        });
    }

    public fillCells(fillingData: CellCoords[], textureKey: string) {
        fillingData.forEach((data) => {
            const cell = this.cellsContainer.all[data.row][data.col];

            cell.fill(textureKey);
        });
    }

    public clearHighlightedCells() {
        this.cellsContainer.all.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell.isHighlighted && !cell.isFilled)
                    cell.clear();
            });
        });
    }

    public clearCells(cellCoords: CellCoords[]) {
        cellCoords.forEach((coords) => {
            const cell = this.cellsContainer.all[coords.row][coords.col];

            cell.clear();
        });
    }

    private createBackground(){
        this.background = this.scene.add.rectangle(0, 0, 10, 10, BoardConfig.bgColor);
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
        const padding = BoardConfig.cellsPadding * 2;
        const width = this.cellsContainer.width + padding;
        const height = this.cellsContainer.height + padding;

        this.background.setDisplaySize(width, height);
    }
}