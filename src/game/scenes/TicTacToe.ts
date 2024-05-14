import {Grid, GridInputHandler} from "../TicTacToe/grid";
import {SceneNames} from "./SceneNames";
import {GameController} from "../TicTacToe/GameController";
import {Textures, GridConfig} from "../TicTacToe/Configs";
import {TextButton} from "../../common";
import AnchorPlugin from "phaser3-rex-plugins/plugins/anchor-plugin";

export class TicTacToe extends Phaser.Scene {
    private text!: Phaser.GameObjects.Text;
    private gridConfig!: GridConfig;
    private grid!: Grid;
    private gridInputHandler!: GridInputHandler;
    private gameController!: GameController;
    private restartButton!: TextButton;
    private anchor!: AnchorPlugin;

    constructor() {
        super({ key: SceneNames.TicTacToe });
    }

    public preload() {
        this.load.image(Textures.pieces.x.key, Textures.pieces.x.url);
        this.load.image(Textures.pieces.o.key, Textures.pieces.o.url);
        this.anchor = this.plugins.get('rexAnchor') as AnchorPlugin;
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
        this.text = this.add.text(0, 0, 'Tic-Tac-Toe', {
            fontFamily: 'Fantasy',
            fontSize: '42px',
            color: '#fa7269'
        }).setOrigin(0.5);

        this.anchor.add(this.text, {
            centerX: `center`,
            y: `10%`
        });
    }

    private createGrid() {
        this.grid = new Grid(this, 0, 0, this.gridConfig);

        const x = (this.gridConfig.cols * this.gridConfig.cell.width) / 2;
        const y = (this.gridConfig.rows * this.gridConfig.cell.height) / 2;

        this.anchor.add(this.grid, {
            centerX: `center-${x}`,
            centerY: `center-${y}`,
        });
    }

    private createRestartButton() {
        this.restartButton = new TextButton(this, 0, 0, "Restart", () => this.scene.restart());

        this.anchor.add(this.restartButton, {
            centerX: `center`,
            y: `90%`
        });
    }
}