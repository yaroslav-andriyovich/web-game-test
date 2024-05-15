import {Board} from "./Board";
import {CellCoords} from "../../common/CellCoords";
import {Figure} from "./Figure";
import {CellConfig} from "./Configs";

export class BoardFiller {
    private readonly board: Board;

    private highlightedCells!: CellCoords[];
    private comboCells!: CellCoords[];
    private fillingTextureKey: string;
    public canFill!: boolean;

    constructor(board: Board) {
        this.board = board;
        this.highlightedCells = [];
        this.comboCells = [];
    }

    public clear() {
        this.highlightedCells = [];
        this.comboCells = [];
        this.fillingTextureKey = '';
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
                const cellX = cellWorldMatrix.translateX + cellOffset;
                const cellY = cellWorldMatrix.translateY + cellOffset;

                for (const part of figureParts) {
                    const figurePartWorldMatrix = part.getWorldTransformMatrix().decomposeMatrix();
                    const figurePartX = figurePartWorldMatrix.translateX + cellOffset;
                    const figurePartY = figurePartWorldMatrix.translateY + cellOffset;

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
            this.fillingTextureKey = figure.model.textureKey;
            this.board.highlightCells(this.highlightedCells, this.fillingTextureKey);
            this.highlightCombo();
        } else {
            this.canFill = false;
        }
    }

    public fill() {
        this.board.fillCells(this.highlightedCells, this.fillingTextureKey);
        this.board.clearCells(this.comboCells);
        this.clear();
    }

    private highlightCombo() {
        const comboRows = this.checkComboHighlighted(MatrixDirection.rows);
        const comboCols = this.checkComboHighlighted(MatrixDirection.cols);
        this.comboCells = comboRows.concat(comboCols);

        this.board.highlightComboCells(this.comboCells, this.fillingTextureKey);
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
}

enum MatrixDirection {
    rows,
    cols
}