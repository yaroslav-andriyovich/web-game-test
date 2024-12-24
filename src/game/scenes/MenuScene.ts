import {SceneNames} from "./SceneNames";
import {TextButton} from "../../common";

export class MenuScene extends Phaser.Scene {
    private ticTacToeBtn!: TextButton;
    private stackBtn!: TextButton;

    constructor() {
        super({ key: SceneNames.Menu });
    }

    public preload() {
    }

    public create() {
        const btnX = this.game.scale.width / 2;
        const btnY = 50;

        this.ticTacToeBtn = new TextButton(this, btnX, btnY, "Tic-Tac-Toe", () => this.scene.start(SceneNames.TicTacToe));
        this.stackBtn = new TextButton(this, btnX, btnY + 60, "Stack", () => this.scene.start(SceneNames.Stack));

        //this.scene.start(SceneNames.Stack);
    }
}