import {SceneNames} from "./SceneNames";
import {Figures, Textures} from "../Stack";
import {Board} from "../Stack/Board";
import {FigureController} from "../Stack/FigureController";
import {AvailableFigureIndexesProvider} from "../Stack/AvailableFigureIndexesProvider";
import {FillResult} from "../Stack/BoardFiller";

export class Stack extends Phaser.Scene {
    private readonly backgroundColor = 0x221A33;

    private background!: Phaser.GameObjects.Rectangle;
    private board1!: Board;
    private board2!: Board;
    private availableFigures!: AvailableFigureIndexesProvider;
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
    }

    public create() {
        this.createBackground();
        this.createBoards();
        this.createFigureControllers();

        this.simulateServer_ReceivedFigures();
    }

    private createBackground() {
        this.background = this.add.rectangle(0, 0, 10, 10, this.backgroundColor);
        this.background.setOrigin(0);

        this.rexAnchor.add(this.background, {
            width: '100%',
            height: '100%'
        });
    }

    private createBoards() {
        this.board1 = new Board(this, 400, 400);
        this.board2 = new Board(this, 400, 40);
    }

    private createFigureControllers() {
        this.availableFigures = new AvailableFigureIndexesProvider();
        this.figureController = new FigureController(this, this.board1, this.availableFigures);
        this.figureController.eventEmitter.on(this.figureController.fillEvent, this.simulateServer_ProcessPlayerMove, this);
    }

    private simulateServer_ProcessPlayerMove(fillResult: FillResult) {
        this.board2.fillCells(fillResult.filledCells, Figures[fillResult.figureIndex].textureKey);
        this.board2.clearCells(fillResult.comboCells);

        const randomIndex = Phaser.Math.Between(0, Figures.length - 1);

        this.availableFigures.addFigure(randomIndex);
    }

    private simulateServer_ReceivedFigures() {
        const figuresNumber = 3;

        for (let i = 0; i < figuresNumber; i++) {
            const randomIndex = Phaser.Math.Between(0, Figures.length - 1);

            this.availableFigures.addFigure(randomIndex);
        }
    }
}