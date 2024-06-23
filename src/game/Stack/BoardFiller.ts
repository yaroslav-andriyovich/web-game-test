import {Board} from "./Board";
import {CellCoords} from "../../common/CellCoords";
import {Figure} from "./Figure";
import {CellConfig, Figures} from "./Configs";

export class BoardFiller {
    private readonly board: Board;

    private highlightedCells!: CellCoords[];
    private comboCells!: CellCoords[];
    private currentFigure!: Figure;
    public canFill!: boolean;

    constructor(board: Board) {
        this.board = board;
        this.highlightedCells = [];
        this.comboCells = [];
    }

    public clear() {
        this.highlightedCells = [];
        this.comboCells = [];
        this.currentFigure = null;
        this.canFill = false;
    }

    public checkBoardHighlighting(figure: Figure) {
        this.clear();

        const cellOffset = CellConfig.cellSize * 0.5;
        const figureParts = figure.parts.flat();
        const figurePartsNumber = figureParts.length;

        for (const boardRow of this.board.cells) {
            for (const cell of boardRow) {
                if (cell.isNotEmpty)
                    continue;

                const cellWorldMatrix = cell.getWorldTransformMatrix().decomposeMatrix();
                const cellX = cellWorldMatrix.translateX;
                const cellY = cellWorldMatrix.translateY;

                for (const part of figureParts) {
                    const figurePartWorldMatrix = part.getWorldTransformMatrix().decomposeMatrix();
                    const figurePartX = figurePartWorldMatrix.translateX;
                    const figurePartY = figurePartWorldMatrix.translateY;

                    const distance = Phaser.Math.Distance.Between(cellX, cellY, figurePartX, figurePartY);
                    const coords = cell.coords;

                    if (distance <= cellOffset && !this.highlightedCells.includes(coords)) {
                        this.highlightedCells.push(coords);
                        figureParts.splice(figureParts.indexOf(part), 1);
                    }
                }
            }
        }

        if (this.highlightedCells.length == figurePartsNumber) {
            this.canFill = true;
            this.currentFigure = figure;
            this.board.highlightCells(this.highlightedCells, figure.model.textureKey);
            this.highlightCombo();
        } else {
            this.clear();
        }
    }

    public fill() {
        this.board.fillCells(this.highlightedCells, this.currentFigure.model.textureKey);
        this.board.clearCells(this.comboCells);

        const result: FillResult = {
            filledCells: this.highlightedCells,
            comboCells: this.comboCells,
            figureIndex: this.currentFigure.index
        };

        this.clear();

        return result;
    }

    private highlightCombo() {
        const comboRows = this.checkComboHighlighted(MatrixDirection.rows);
        const comboCols = this.checkComboHighlighted(MatrixDirection.cols);
        this.comboCells = comboRows.concat(comboCols);

        this.board.highlightComboCells(this.comboCells, this.currentFigure.model.textureKey);
    }

    private checkComboHighlighted(direction: MatrixDirection) {
        const isCheckingRow = direction === MatrixDirection.rows;
        let comboRows: CellCoords[] = [];

        for (let i = 0; i < (isCheckingRow ? this.board.cells.length : this.board.cells[0].length); i++) {
            const coords = [];

            for (let j = 0; j < (isCheckingRow ? this.board.cells[0].length : this.board.cells.length); j++) {
                const cell = (isCheckingRow ? this.board.cells[i][j] : this.board.cells[j][i]);

                if (cell.isNotEmpty) {
                    coords.push(cell.coords);
                } else
                    break;
            }

            if (coords.length == (isCheckingRow ? this.board.cells[0].length : this.board.cells.length))
                comboRows = comboRows.concat(coords);
        }

        return comboRows;
    }

    public canPlaceFigureOnBoard(figure: Figure): boolean {
        for (let i = 0; i <= this.board.cells.length - figure.parts.length; i++) {
            for (let j = 0; j <= this.board.cells[0].length - figure.parts[0].length; j++) {
                if (this.canPlaceFigureAtPosition(figure, i, j)) {
                    return true;
                }
            }
        }
        return false;
    }

    private canPlaceFigureAtPosition(figure: Figure, row: number, col: number): boolean {
        for (let i = 0; i < figure.parts.length; i++) {
            for (let j = 0; j < figure.parts[i].length; j++) {
                const boardRow = row + i;
                const boardCol = col + j;

                if (this.isPositionOutOfBounds(boardRow, boardCol)
                    || this.isFigurePartNotEmpty(figure, i, j) && this.isBoardCellFilled(boardRow, boardCol)) {
                    return false;
                }
            }
        }
        return true;
    }

    private isPositionOutOfBounds(row: number, col: number) : boolean {
        return row < 0 || row >= this.board.cells.length
            || col < 0 || col >= this.board.cells[0].length;
    }

    private isFigurePartNotEmpty(figure: Figure, row: number, col: number) : boolean {
        return figure.model.parts[row][col] === 1;
    }

    private isBoardCellFilled(row: number, col: number) : boolean {
        return this.board.cells[row][col].isFilled;
    }
}

export type FillResult = {
    filledCells: CellCoords[],
    comboCells: CellCoords[],
    figureIndex: number
};

enum MatrixDirection {
    rows,
    cols
}