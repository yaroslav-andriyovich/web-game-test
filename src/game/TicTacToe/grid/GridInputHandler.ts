import {Grid} from "./Grid";
import {GameController} from "../GameController";
import {Cell, Piece} from "./cell";
import {Textures} from "../Configs";
import {CellCoords} from "../../../common/CellCoords";

export class GridInputHandler {
    private grid: Grid;
    private gameController: GameController;

    constructor(grid: Grid, gameController: GameController) {
        this.grid = grid;
        this.gameController = gameController;

        this.subscribeCells();
    }

    private subscribeCells() {
        for (let i= 0; i < this.grid.rows; i++) {
            for (let j= 0; j < this.grid.cols; j++) {
                const cell = this.grid.getCellAt(new CellCoords(i, j));

                cell.on(Phaser.Input.Events.POINTER_UP, () => this.onCellPointerUp(cell));
                cell.on(Phaser.Input.Events.POINTER_OVER, () => this.onCellPointerOver(cell));
                cell.on(Phaser.Input.Events.POINTER_OUT, () => this.onCellPointerOut(cell));
            }
        }
    }

    private onCellPointerUp(cell: Cell){
        this.gameController.notifyLocalClick(cell.cord);
    }

    private onCellPointerOver(cell: Cell) {
        const textureKey = this.gameController.currentPiece == Piece.X ? Textures.pieces.x.key : Textures.pieces.o.key;

        cell.showPreview(textureKey);
    }

    private onCellPointerOut(cell: Cell) {
        cell.hidePreview();
    }
}