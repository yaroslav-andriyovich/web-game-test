import {Grid, GridInputHandler} from "../core/grid";
import {SceneNames} from "./SceneNames";
import {GameController} from "../GameController";
import { Textures, GridConfig } from "../Configs";

export class GameScene extends Phaser.Scene {
    private text!: Phaser.GameObjects.Text;
    private gridConfig!: GridConfig;
    private grid!: Grid;
    private gridInputHandler!: GridInputHandler;
    private gameController!: GameController;
    private button!: Phaser.GameObjects.Container;
    private buttonText!: Phaser.GameObjects.Text;
    private buttonBackground!: Phaser.GameObjects.Rectangle;

    constructor() {
        super({ key: SceneNames.Game });
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
        this.buttonBackground = this.add.rectangle(0, 0, 200, 50, 0x3498db);
        this.buttonBackground.setInteractive();

        this.buttonText = this.add.text(0, 0, 'Restart', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
        this.buttonText.setOrigin(0.5);

        this.button = this.add.container(this.screenWidthCenter, 590);
        this.button.add([this.buttonBackground, this.buttonText]);

        this.buttonBackground.on('pointerdown', () => { this.buttonBackground.fillColor = 0x005497; });
        this.buttonBackground.on('pointerup', () => { this.scene.restart(); });
        this.buttonBackground.on('pointerover', () => { this.buttonBackground.fillColor = 0x1276b9; });
        this.buttonBackground.on('pointerout', () => { this.buttonBackground.fillColor = 0x3498db; });
    }

    private get screenWidthCenter(): number {
        return this.game.scale.width / 2;
    }

    private get screenHeightCenter(): number {
        return this.game.scale.height / 2;
    }
}