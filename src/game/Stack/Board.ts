import {BoardConfig, CellConfig} from "./Configs";
import {CellCoords} from "../../common/CellCoords";
import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import {BoardCell} from "./BoardCell";
import GridSizer from 'phaser3-rex-plugins/templates/ui/gridsizer/GridSizer';

export class Board extends Phaser.GameObjects.Container {
    private background!: UIPlugin.RoundRectangle;
    public cells!: BoardCell[][];
    private gridSizer!: GridSizer;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.createCells();
        this.createBackground();

        this.setSize(this.getBounds().width, this.getBounds().height);
        /*this.setInteractive();
        this.scene.input.enableDebug(this);*/
        this.scene.add.existing(this);
    }

    public highlightCells(cellCoords: CellCoords[], textureKey: string) {
        for (const coords of cellCoords) {
            const cell = this.cells[coords.row][coords.col];

            cell.highlight(textureKey);
        }
    }

    public highlightComboCells(cellCoords: CellCoords[], textureKey: string) {
        for (const coords of cellCoords) {
            const cell = this.cells[coords.row][coords.col];

            cell.highlightCombo(textureKey);
        }
    }

    public fillCells(cellCoords: CellCoords[], textureKey: string) {
        for (const coords of cellCoords) {
            const cell = this.cells[coords.row][coords.col];

            cell.fill(textureKey);
        }
    }

    public clearHighlightedCells() {
        for (const row of this.cells) {
            for (const cell of row) {
                if (cell.isHighlighted)
                    cell.clearHighlighting();
            }
        }
    }

    public clearCells(cellCoords: CellCoords[]) {
        for (const coords of cellCoords) {
            const cell = this.cells[coords.row][coords.col];

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
        //this.background.setAlpha(0.5);

        this.add(this.background);
        this.sendToBack(this.background);
    }

    private createCells() {
        const padding = BoardConfig.cellsPadding;
        const cellsCount = BoardConfig.cellsCount;

        this.gridSizer = this.scene.rexUI.add.gridSizer({
            x: padding, y: padding,
            column: cellsCount, row: cellsCount,
            columnProportions: 1, rowProportions: 1,
            space: { column: CellConfig.cellOffset, row: CellConfig.cellOffset }
        }).setOrigin(0);

        this.cells = [];

        for (let i = 0; i < cellsCount; i++) {
            this.cells[i] = [];

            for (let j = 0; j < cellsCount; j++) {
                const cell = new BoardCell(this.scene, 0, 0, new CellCoords(i, j));

                this.gridSizer.add(cell, j, i, 'center', CellConfig.cellOffset, true);
                this.cells[i][j] = cell;
            }
        }

        this.gridSizer.layout();
        this.add(this.gridSizer);
    }
}