import {Grid, GridInputHandler} from "../TicTacToe/grid";
import {SceneNames} from "./SceneNames";
import {GameController} from "../TicTacToe/GameController";
import { Textures, GridConfig } from "../TicTacToe/Configs";
import {TextButton} from "../../common";

export class TicTacToe extends Phaser.Scene {
    private text!: Phaser.GameObjects.Text;
    private gridConfig!: GridConfig;
    private grid!: Grid;
    private gridInputHandler!: GridInputHandler;
    private gameController!: GameController;
    private restartButton!: TextButton;

    constructor() {
        super({ key: SceneNames.TicTacToe });
    }

    public preload() {
        this.load.image(Textures.pieces.x.key, Textures.pieces.x.url);
        this.load.image(Textures.pieces.o.key, Textures.pieces.o.url);
    }

    public create() {
        this.createConfigs();
        this.createText();
        this.createGrid();

        this.gameController = new GameController(this.grid, this.text);
        this.gridInputHandler = new GridInputHandler(this.grid, this.gameController);

        this.createRestartButton();
    }

    private createConfigs() {
        const cellConfig = {
            width: 100,
            height: 100,
            overImageAlpha: 0.1
        };

        this.gridConfig = {
            rows: 3,
            cols: 3,
            borderWidth: 2,
            borderColor: 0x3e3e3e,
            cell: cellConfig
        };
    }

    private createText() {
        this.text = this.add.text(this.screenWidthCenter, 50, 'Tic-Tac-Toe', {
            fontFamily: 'Fantasy',
            fontSize: '42px',
            color: '#fa7269'
        }).setOrigin(0.5);
    }

    private createGrid() {
        const x = this.screenWidthCenter - (this.gridConfig.cols * this.gridConfig.cell.width) / 2;
        const y = this.screenHeightCenter - (this.gridConfig.rows * this.gridConfig.cell.height) / 2;
        const position = new Phaser.Math.Vector2(x, y);

        this.grid = new Grid(this, this.gridConfig, position);
    }

    private createRestartButton() {
        this.restartButton = new TextButton(this, this.screenWidthCenter, 590, "Restart", () => this.scene.restart());
    }

    private get screenWidthCenter(): number {
        return this.game.scale.width / 2;
    }

    private get screenHeightCenter(): number {
        return this.game.scale.height / 2;
    }
}