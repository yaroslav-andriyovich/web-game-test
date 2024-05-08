import {Grid} from "./grid";
import {Piece, Cell} from "./grid/cell";
import {GameController} from "./GameController";
import {CellCoords} from "../../common/CellCoords";

export class GameOverChecker {
    private readonly grid: Grid;
    private readonly gameController: GameController;
    private readonly pieceCountToWin: number;

    constructor(grid: Grid, gameController: GameController) {
        this.grid = grid;
        this.gameController = gameController;
        this.pieceCountToWin = 3;
    }

    public checkWin() {
        return this.checkRows() || this.checkCols() || this.checkDiagonals();
    }

    public checkDraw() {
        for (let i = 0; i < this.grid.rows; i++) {
            for (let j = 0; j < this.grid.cols; j++) {
                const cell = this.grid.getCellAt(new CellCoords(i, j));

                if (cell.getPiece() == Piece.None)
                    return false;
            }
        }

        return true;
    }

    private checkRows() {
        for (let i = 0; i < this.grid.rows; i++) {
            let count = 0;
            let winCells: Cell[] = [];

            for (let j = 0; j < this.grid.cols; j++) {
                const cell = this.grid.getCellAt(new CellCoords(i, j));

                if (cell.getPiece() == this.gameController.currentPiece) {
                    winCells[count] = cell;
                    ++count;

                    if (count >= this.pieceCountToWin) {
                        this.grid.displayWinCells(winCells);
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }

        return false;
    }

    private checkCols() {
        for (let i = 0; i < this.grid.cols; i++) {
            let count = 0;
            let winCells: Cell[] = [];

            for (let j = 0; j < this.grid.rows; j++) {
                const cell = this.grid.getCellAt(new CellCoords(j, i));

                if (cell.getPiece() == this.gameController.currentPiece) {
                    winCells[count] = cell;
                    ++count;

                    if (count >= this.pieceCountToWin) {
                        this.grid.displayWinCells(winCells);
                        return true;
                    }
                } else {
                    count = 0;
                }
            }
        }

        return false;
    }

    private checkDiagonals() {
        for (let i = 0; i <= this.grid.rows - this.pieceCountToWin; i++) {
            for (let j = 0; j <= this.grid.cols - this.pieceCountToWin; j++) {
                if (this.checkDiagonalFromTopLeft(i, j))
                    return true;
            }
        }

        for (let i = 0; i <= this.grid.rows - this.pieceCountToWin; i++) {
            for (let j = this.grid.cols - 1; j >= this.pieceCountToWin - 1; j--) {
                if (this.checkDiagonalFromTopRight(i, j))
                    return true;
            }
        }

        return false;
    }

    private checkDiagonalFromTopLeft(row: number, col: number) {
        let count = 0;
        let winCells: Cell[] = [];

        for (let i = 0; i < this.pieceCountToWin; i++) {
            const cell = this.grid.getCellAt(new CellCoords(row + i, col + i));

            if (cell.getPiece() == this.gameController.currentPiece) {
                winCells[count] = cell;
                ++count;

                if (count >= this.pieceCountToWin) {
                    this.grid.displayWinCells(winCells);
                    return true;
                }
            } else {
                count = 0;
            }
        }

        return false;
    }

    private checkDiagonalFromTopRight(row: number, col: number) {
        let count = 0;
        let winCells: Cell[] = [];

        for (let i = 0; i < this.pieceCountToWin; i++) {
            const cell = this.grid.getCellAt(new CellCoords(row + i, col - i));

            if (cell.getPiece() == this.gameController.currentPiece) {
                winCells[count] = cell;
                ++count;

                if (count >= this.pieceCountToWin) {
                    this.grid.displayWinCells(winCells);
                    return true;
                }
            } else {
                count = 0;
            }
        }

        return false;
    }
}