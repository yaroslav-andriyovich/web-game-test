import {BoardConfig, CellConfig} from "./Configs";
import {CellCoords} from "../../common/CellCoords";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import {BoardCell} from "./BoardCell";
import GridSizer from 'phaser3-rex-plugins/templates/ui/gridsizer/GridSizer';

export class Board extends Phaser.GameObjects.Container {
    private background!: UIPlugin.RoundRectangle;
    private cellsMatrix!: BoardCell[][];
    private gridSizer!: GridSizer;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.createGridSizer();
        this.createBackground();

        this.setSize(this.getBounds().width, this.getBounds().height);
        /*this.setInteractive();
        this.scene.input.enableDebug(this);*/
        this.scene.add.existing(this);
    }

    public get cells() : BoardCell[][] {
        return this.cellsMatrix;
    }

    public highlightCells(cellCoords: CellCoords[], textureKey: string) {
        for (const coords of cellCoords) {
            const cell = this.cellsMatrix[coords.row][coords.col];

            cell.highlight(textureKey);
        }
    }

    public highlightComboCells(cellCoords: CellCoords[], textureKey: string) {
        for (const coords of cellCoords) {
            const cell = this.cellsMatrix[coords.row][coords.col];

            cell.highlightCombo(textureKey);
        }
    }

    public fillCells(cellCoords: CellCoords[], textureKey: string) {
        for (const coords of cellCoords) {
            const cell = this.cellsMatrix[coords.row][coords.col];

            cell.fill(textureKey);
        }
    }

    public clearHighlightedCells() {
        for (const row of this.cellsMatrix) {
            for (const cell of row) {
                if (cell.isHighlighted)
                    cell.clearHighlighting();
            }
        }
    }

    public clearCells(cellCoords: CellCoords[]) {
        for (const coords of cellCoords) {
            const cell = this.cellsMatrix[coords.row][coords.col];

            cell.clear();
        }
    }

    private createBackground() {
        const bounds: Phaser.Geom.Rectangle = this.getBounds();
        const padding = BoardConfig.cellsPadding * 2;
        const width = bounds.width + padding;
        const height = bounds.height + padding;

        this.background = this.scene.rexUI.add.roundRectangle(0, 0, width, height, 6, BoardConfig.bgColor);
        this.background.setOrigin(0);

        this.add(this.background);
        this.sendToBack(this.background);
    }

    private createGridSizer() {
        const padding = BoardConfig.cellsPadding;
        const cellsNumber = BoardConfig.cellsCount;

        this.gridSizer = this.scene.rexUI.add.gridSizer({
            x: padding, y: padding,
            column: cellsNumber, row: cellsNumber,
            columnProportions: 1, rowProportions: 1,
            space: { column: CellConfig.cellOffset, row: CellConfig.cellOffset }
        }).setOrigin(0);

        this.createSizerCells(cellsNumber);
    }

    private createSizerCells(cellsNumber: number) {
        this.cellsMatrix = [];

        for (let rows = 0; rows < cellsNumber; rows++) {
            this.cellsMatrix[rows] = [];

            for (let cols = 0; cols < cellsNumber; cols++) {
                const cell = new BoardCell(this.scene, 0, 0, new CellCoords(rows, cols));

                this.gridSizer.add(cell, cols, rows, 'center', CellConfig.cellOffset, true);
                this.cellsMatrix[rows][cols] = cell;
            }
        }

        this.gridSizer.layout();
        this.add(this.gridSizer);
    }
}