import {Board} from "./Board";
import {Figure, Figures} from "./index";
import {BoardFiller} from "./BoardFiller";
import {AvailableFigureIndexesProvider} from "./AvailableFigureIndexesProvider";
import {FigureContainer} from "./FigureContainer";

export class FigureController {
    public readonly fillEvent = "fillEvent";
    public readonly eventEmitter: Phaser.Events.EventEmitter;

    private readonly availableFiguresNumber: number = 3;
    private readonly scene: Phaser.Scene;
    private readonly board: Board;
    private readonly availableFigures: AvailableFigureIndexesProvider;
    private readonly figureContainer: FigureContainer;
    private readonly boardFiller: BoardFiller;
    private readonly additionalDragOffset: number = 10;

    private draggable!: Figure;

    constructor(scene: Phaser.Scene, board: Board, figureGenerator: AvailableFigureIndexesProvider, figureContainer: FigureContainer) {
        this.eventEmitter = new Phaser.Events.EventEmitter();
        this.scene = scene;
        this.board = board;
        this.availableFigures = figureGenerator;
        this.figureContainer = figureContainer;
        this.boardFiller = new BoardFiller(this.board);

        this.availableFigures.eventEmitter.on(this.availableFigures.figureAddEvent, this.onFigureAdded, this);
    }

    private onFigureAdded() {
        const needCreateFigure = this.figureContainer.figuresNumber < this.availableFiguresNumber;

        if (needCreateFigure) {
            this.createFigure();
            this.checkFigurePlacing();
        }
    }

    private createFigure() {
        const figureIndex = this.availableFigures.getNext();
        const model = Figures[figureIndex];
        const figure = new Figure(this.scene, 0, 0, model, figureIndex);

        this.scene.rexDrag.add(figure);

        this.scene.input.on('dragstart', this.onDragStart, this);
        figure.on('drag', this.onDrag, this);
        figure.on('dragend', this.onDragEnd, this);

        this.figureContainer.addFigure(figure);
    }

    private onDragStart(pointer: Phaser.Input.Pointer, gameObject: any) {
        if (gameObject instanceof Figure) {
            this.draggable = gameObject;
            this.draggable.setScale(1);
            this.setFigureTopDepth(gameObject);
            this.changeDraggablePosition(pointer);
        } else {
            this.draggable = null;
        }
    }

    private onDrag(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
        if (!this.draggable)
            return;

        this.changeDraggablePosition(pointer);

        this.board.clearHighlightedCells();
        this.boardFiller.checkBoardHighlighting(this.draggable);
    }

    private onDragEnd(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
        if (!this.draggable)
            return;

        if (!this.boardFiller.canFill) {
            this.figureContainer.resetFigurePositions();
            this.draggable = null;
            return;
        }

        const fillResult = this.boardFiller.fill();

        this.destroyUsedFigure();
        this.eventEmitter.emit(this.fillEvent, fillResult);
    }

    private setFigureTopDepth(topFigure: Figure) {
        topFigure.setDepth(1);

        for (const figure of this.figureContainer.figures) {
            if (figure !== topFigure) {
                figure.setDepth(0);
            }
        }
    }

    private changeDraggablePosition(pointer: Phaser.Input.Pointer) {
        const offsetY = this.draggable.height + this.additionalDragOffset;

        this.draggable.setPosition(pointer.worldX, pointer.worldY - offsetY);
    }

    private destroyUsedFigure() {
        if (!this.draggable)
            return;

        this.figureContainer.removeFigure(this.draggable);

        this.draggable.off('dragstart', this.onDragStart, this);
        this.draggable.off('drag', this.onDrag, this);
        this.draggable.off('dragend', this.onDragEnd, this);
        this.draggable.destroy();
        this.draggable = null;
    }

    private checkFigurePlacing() {
        let deactivatedFigures = 0;

        for (const figure of this.figureContainer.figures) {
            if (!this.boardFiller.canPlaceFigureOnBoard(figure)) {
                figure.deactivate();
                ++deactivatedFigures;
            } else {
                figure.activate();
            }
        }

        if (deactivatedFigures == this.availableFiguresNumber) {
            // Game Over
            this.board.setAlpha(0.6);
        }
    }
}