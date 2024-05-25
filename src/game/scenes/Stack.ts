import {SceneNames} from "./SceneNames";
import {Figure, Figures, Textures} from "../Stack";
import {Board} from "../Stack/Board";
import {FigureController} from "../Stack/FigureController";
import {AvailableFigureIndexesProvider} from "../Stack/AvailableFigureIndexesProvider";
import {FillResult} from "../Stack/BoardFiller";
import {FigureContainer} from "../Stack/FigureContainer";
import {Timer} from "../Stack/Timer";

export class Stack extends Phaser.Scene {
    private readonly backgroundColor = 0x221A33;

    private background!: Phaser.GameObjects.Rectangle;

    private enemyBoard!: Board;
    private enemyFigures!: FigureContainer;
    private enemyTimer!: Timer;

    private playerBoard!: Board;
    private availableFigures!: AvailableFigureIndexesProvider;
    private playerFigures!: FigureContainer;
    private figureController!: FigureController;
    private playerTimer!: Timer;

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
        this.cameras.main.setBackgroundColor(this.backgroundColor);
        this.createEnemy();
        this.createPlayer();

        this.simulateServer_ReceivedFigures();
    }

    private createEnemy() {
        this.enemyBoard = new Board(this, 0, 0);
        this.enemyBoard.setScale(0.4);

        this.rexAnchor.add(this.enemyBoard, {
            centerX: `center-${this.enemyBoard.getBounds().width / 2}`,
            centerY: `2%`
        });

        this.enemyFigures = new FigureContainer(this, 0, 0);
        this.enemyFigures.setScale(0.3);

        for (let i = 0; i < 3; i++) {
            const figureIndex = Phaser.Math.Between(0, Figures.length - 1);
            const model = Figures[figureIndex];
            const figure = new Figure(this, 0, 0, model, figureIndex);

            this.enemyFigures.addFigure(figure);
        }

        this.rexAnchor.add(this.enemyFigures, {
            centerX: `center`,
            centerY: `6%+${this.enemyBoard.y + this.enemyBoard.height * this.enemyBoard.scale}`
        });

        const timerX = this.enemyBoard.x + this.enemyBoard.width * this.enemyBoard.scale + 10;
        const timerY = this.enemyBoard.y;

        this.enemyTimer = new Timer(this, timerX, timerY, 5 * 60);
    }

    private createPlayer() {
        this.playerBoard = new Board(this, 0, 0);

        this.rexAnchor.add(this.playerBoard, {
            centerX: `center-${this.playerBoard.width / 2}`,
            centerY: `center-${this.playerBoard.height / 2.7}`
        });

        this.availableFigures = new AvailableFigureIndexesProvider();
        this.playerFigures = new FigureContainer(this, 0, 0);
        this.figureController = new FigureController(this, this.playerBoard, this.availableFigures, this.playerFigures);
        this.figureController.eventEmitter.on(this.figureController.fillEvent, this.simulateServer_ProcessPlayerMove, this);

        this.playerFigures.setScale(0.6);

        this.rexAnchor.add(this.playerFigures, {
            centerX: `center`,
            centerY: `10%+${this.playerBoard.y + this.playerBoard.height}`
        });

        const timerX = this.playerBoard.x + this.playerBoard.width + 10;
        const timerY = this.playerBoard.y;

        this.playerTimer = new Timer(this, timerX, timerY, 5 * 60);
    }

    private simulateServer_ProcessPlayerMove(fillResult: FillResult) {
        this.enemyBoard.fillCells(fillResult.filledCells, Figures[fillResult.figureIndex].textureKey);
        this.enemyBoard.clearCells(fillResult.comboCells);

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