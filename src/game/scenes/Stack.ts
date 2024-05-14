import {SceneNames} from "./SceneNames";
import AnchorPlugin from "phaser3-rex-plugins/plugins/anchor-plugin";
import {Textures} from "../Stack";
import {Board} from "../Stack/Board";
import {FigureController} from "../Stack/FigureController";

export class Stack extends Phaser.Scene {
    private readonly backgroundColor = 0x221A33;

    private anchor!: AnchorPlugin;
    private background!: Phaser.GameObjects.Rectangle;
    private board1!: Board;
    private board2!: Board;
    private figureController!: FigureController;

    constructor() {
        super({key: SceneNames.Stack});
    }

    public preload() {
        this.load.image(Textures.bg.key, Textures.bg.url);
        this.load.image(Textures.aqua.key, Textures.aqua.url);
        this.load.image(Textures.blue.key, Textures.blue.url);
        this.load.image(Textures.blueviolet.key, Textures.blueviolet.url);
        this.load.image(Textures.green.key, Textures.green.url);
        this.load.image(Textures.orange.key, Textures.orange.url);
        this.load.image(Textures.pink.key, Textures.pink.url);
        this.load.image(Textures.purple.key, Textures.purple.url);
        this.load.image(Textures.red.key, Textures.red.url);
        this.load.image(Textures.yellow.key, Textures.yellow.url);

        this.anchor = this.plugins.get('rexAnchor') as AnchorPlugin;
    }

    public create() {
        this.createBackground();
        this.createBoards();
        this.figureController = new FigureController(this, this.board1);
    }

    private createBackground() {
        this.background = this.add.rectangle(0, 0, 10, 10, this.backgroundColor);
        this.background.setOrigin(0);

        this.anchor.add(this.background, {
            width: '100%',
            height: '100%'
        });
    }

    private createBoards() {
        this.board1 = new Board(this, 400, 400);
        this.board2 = new Board(this, 400, 40);
    }
}