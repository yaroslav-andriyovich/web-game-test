import {BoardConfig} from "./Configs";
import {BoardCells} from "./BoardCells";
import {CellCoords} from "../../common/CellCoords";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";

export class Board extends Phaser.GameObjects.Container {
    private background!: UIPlugin.RoundRectangle;
    private cellsContainer!: BoardCells;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.createCells();
        this.createBackground();

        this.scene.add.existing(this);
    }

    public get cells() {
        return this.cellsContainer.all;
    }

    public highlightCells(cellCoords: CellCoords[], textureKey: string) {
        for (const coords of cellCoords) {
            const cell = this.cellsContainer.all[coords.row][coords.col];

            cell.highlight(textureKey);
        }
    }

    public highlightComboCells(cellCoords: CellCoords[], textureKey: string) {
        for (const coords of cellCoords) {
            const cell = this.cellsContainer.all[coords.row][coords.col];

            cell.highlightCombo(textureKey);
        }
    }

    public fillCells(cellCoords: CellCoords[], textureKey: string) {
        for (const coords of cellCoords) {
            const cell = this.cellsContainer.all[coords.row][coords.col];

            cell.fill(textureKey);
        }
    }

    public clearHighlightedCells() {
        for (const row of this.cellsContainer.all) {
            for (const cell of row) {
                if (cell.isHighlighted)
                    cell.clearHighlighting();
            }
        }
    }

    public clearCells(cellCoords: CellCoords[]) {
        for (const coords of cellCoords) {
            const cell = this.cellsContainer.all[coords.row][coords.col];

            cell.clear();
        }
    }

    private createBackground() {
        const padding = BoardConfig.cellsPadding * 2;
        const width = this.cellsContainer.width + padding;
        const height = this.cellsContainer.height + padding;

        this.background = this.scene.rexUI.add.roundRectangle(0, 0, width, height, 0.25, BoardConfig.bgColor);
        this.background.setOrigin(0);

        this.add(this.background);
        this.sendToBack(this.background);
    }

    private createCells() {
        const x = BoardConfig.cellsPadding;
        const y = BoardConfig.cellsPadding;

        this.cellsContainer = new BoardCells(this.scene, x, y);

        this.add(this.cellsContainer);
    }
}