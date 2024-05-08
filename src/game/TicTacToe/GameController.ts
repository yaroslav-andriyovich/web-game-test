import {Grid} from "./grid";
import {Piece} from "./grid/cell";
import {GameOverChecker} from "./GameOverChecker";
import {Textures} from "./Configs";
import {CellCoords} from "../../common/CellCoords";

export class GameController {
    private readonly grid: Grid;
    private readonly text: Phaser.GameObjects.Text;
    private readonly gameOverChecker: GameOverChecker;

    private playerPiece!: Piece;
    private isGameOver!: boolean;

    constructor(grid: Grid, text: Phaser.GameObjects.Text) {
        this.grid = grid;
        this.text = text;
        this.gameOverChecker = new GameOverChecker(this.grid, this);
        this.playerPiece = Piece.X;
    }

    public get currentPiece() {
        return this.playerPiece;
    }

    public notifyLocalClick(cellCord: CellCoords) {
        if (this.isGameOver)
            return;

        this.makeMove(cellCord, this.playerPiece);
    }

    public makeMove(cellCord: CellCoords, piece: Piece) {
        if (this.isGameOver)
            return;

        const pieceTextureKey: string = piece == Piece.X ? Textures.pieces.x.key : Textures.pieces.o.key;
        const cell = this.grid.getCellAt(cellCord);

        cell.setPiece(piece, pieceTextureKey);

        if (this.gameOverChecker.checkWin()) {
            this.text.setText(`${this.currentPiece == Piece.X ? 'X' : 'O'} Win!`);
            this.isGameOver = true;
            return;
        }
        else if (this.gameOverChecker.checkDraw()) {
            this.text.setText("Draw!");
            this.isGameOver = true;
            return;
        }

        this.playerPiece = piece == Piece.O ? Piece.X : Piece.O; // switch player
    }
}