import {SceneNames} from "./SceneNames";
import {Figures, Textures} from "../Stack";
import {Board} from "../Stack/Board";
import {FigureController} from "../Stack/FigureController";
import {AvailableFigureIndexesProvider} from "../Stack/AvailableFigureIndexesProvider";
import {FillResult} from "../Stack/BoardFiller";
import {FigureContainer} from "../Stack/FigureContainer";

export class Stack extends Phaser.Scene {
    private readonly backgroundColor = 0x221A33;

    private background!: Phaser.GameObjects.Rectangle;
    private board1!: Board;
    private board2!: Board;
    private availableFigures!: AvailableFigureIndexesProvider;
    private figureContainer1!: FigureContainer;
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
        this.board1 = new Board(this, 200, 300);
        this.board2 = new Board(this, 200, 10);

        this.rexAnchor.add(this.board2, {
            centerX: `center-${this.board2.getBounds().width / 2}`,
            centerY: `2%`
        });

        this.rexAnchor.add(this.board1, {
            centerX: `center-${this.board1.getBounds().width / 2}`,
            centerY: `4%+${this.board2.getBounds().height}`
        });
    }

    private createFigureControllers() {
        this.availableFigures = new AvailableFigureIndexesProvider();
        this.figureContainer1 = new FigureContainer(this, 0, 0);
        this.figureController = new FigureController(this, this.board1, this.availableFigures, this.figureContainer1);
        this.figureController.eventEmitter.on(this.figureController.fillEvent, this.simulateServer_ProcessPlayerMove, this);

        this.rexAnchor.add(this.figureContainer1.gameObject, {
            centerX: `center-${this.figureContainer1.maxWidth / 2}`,
            centerY: `10%+${this.board1.getBounds().height * 2}`
        });
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