import {Cell, CellConfig, Grid, GridConfig, Pieces} from "../core/grid";
import {SceneNames} from "./SceneNames";

export class GameScene extends Phaser.Scene {
    private grid!: Grid;
    private gridConfig!: GridConfig;
    private button!: Phaser.GameObjects.Container;
    private buttonText!: Phaser.GameObjects.Text;
    private buttonBackground!: Phaser.GameObjects.Rectangle;
    private isPieceX: boolean = true;

    constructor() {
        super({ key: SceneNames.Game });
    }

    public preload() {
        this.load.image('x', './x.png');
        this.load.image('o', './o.png');
    }

    public create() {
        this.createConfigs();
        this.createText();
        this.createGrid();
        this.createRestartButton();
    }

    private createText() {
        const text = this.add.text(240, 50, 'Tic-Tac-Toe', {
            fontFamily: 'Fantasy',
            fontSize: '42px',
            color: '#fa7269'
        }).setOrigin(0.5);
    }

    private createGrid() {
        const x = 240 - (this.gridConfig.cols * this.gridConfig.cell.width) / 2;
        const y = 320 - (this.gridConfig.rows * this.gridConfig.cell.height) / 2;
        const position = new Phaser.Math.Vector2(x, y);

        this.grid = new Grid(this, this.gridConfig, position);
        const cells = this.grid.getCells();

        for (let i= 0; i < this.gridConfig.rows; i++) {
            for (let j= 0; j < this.gridConfig.cols; j++) {
                const cell = cells[i][j];

                cell.on(Phaser.Input.Events.POINTER_UP, () => this.onCellClick(cell));
                cell.on(Phaser.Input.Events.POINTER_OVER, () => this.onCellPointerOver(cell));
                cell.on(Phaser.Input.Events.POINTER_OUT, () => this.onCellPointerOut(cell));
            }
        }
    }

    private createConfigs() {
        const cellConfig: CellConfig = {
            width: 100,
            height: 100,
            overImageAlpha: 0.1
        };

        this.gridConfig = {
            rows: 3,
            cols: 3,
            borderColor: 0x3e3e3e,
            borderWidth: 2,
            cell: cellConfig
        };
    }

    private onCellClick(cell: Cell) {
        const piece: Pieces = this.isPieceX ? Pieces.X : Pieces.O;
        const pieceTextureKey: string = this.isPieceX ? 'x' : 'o';

        cell.setPiece(piece, pieceTextureKey);

        this.isPieceX = !this.isPieceX;
    }

    private onCellPointerOver(cell: Cell) {
        cell.onPointerOver(this.isPieceX ? 'x' : 'o');
    }

    private onCellPointerOut(cell: Cell) {
        cell.onPointerOut();
    }

    private createRestartButton() {
        this.buttonBackground = this.add.rectangle(0, 0, 200, 50, 0x3498db);
        this.buttonBackground.setInteractive();

        this.buttonText = this.add.text(0, 0, 'Restart', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
        this.buttonText.setOrigin(0.5);

        this.button = this.add.container(240, 550);
        this.button.add([this.buttonBackground, this.buttonText]);

        this.buttonBackground.on('pointerdown', () => this.onButtonDown());
        this.buttonBackground.on('pointerup', () => this.onButtonUp());
        this.buttonBackground.on('pointerover', () => this.onButtonOver());
        this.buttonBackground.on('pointerout', () => this.onButtonOut());
    }

    private onButtonDown() {
        this.buttonBackground.fillColor = 0x005497;
    }

    private onButtonUp() {
        this.scene.restart();
    }

    private onButtonOver() {
        this.buttonBackground.fillColor = 0x1276b9;
    }

    private onButtonOut() {
        this.buttonBackground.fillColor = 0x3498db;
    }
}