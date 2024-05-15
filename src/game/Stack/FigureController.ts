import {Board} from "./Board";
import DragPlugin from "phaser3-rex-plugins/plugins/drag-plugin";
import {Figure, Figures} from "./index";
import {BoardFiller} from "./BoardFiller";

export class FigureController {
    private readonly scene: Phaser.Scene;
    private readonly board: Board;
    private readonly boardFiller: BoardFiller;
    private readonly dragPlugin: DragPlugin;

    private draggable!: Figure;
    private spawnPosition!: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene, board: Board) {
        this.scene = scene;
        this.board = board;
        this.boardFiller = new BoardFiller(board);
        this.dragPlugin = this.scene.plugins.get('rexDrag') as DragPlugin;
        this.spawnPosition = new Phaser.Math.Vector2(200, 500);

        this.registerDraggable();
        this.createFigures();
    }

    private registerDraggable() {
        this.scene.input.on('dragstart', (pointer, gameObject, dragX, dragY) => {
            if (gameObject instanceof Figure) {
                this.draggable = gameObject;
            } else {
                this.draggable = null;
            }
        });
    }

    private createFigures() {
        this.createFigure(this.spawnPosition.x, this.spawnPosition.y);
    }

    private createFigure(x: number, y: number) {
        const model = Figures[Phaser.Math.Between(0, Figures.length - 1)]
        const figure = new Figure(this.scene, x, y, model);

        if (!this.boardFiller.canPlaceFigureOnBoard(figure)) {
            figure.deactivate();
            return;
        }

        this.dragPlugin.add(figure);

        figure.on('dragstart', this.onDragStart, this);
        figure.on('drag', this.onDrag, this);
        figure.on('dragend', this.onDragEnd, this);
    }

    private onDragStart(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
    }

    private onDrag(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
        if (!this.draggable)
            return;

        this.board.clearHighlightedCells();
        this.boardFiller.checkBoardHighlighting(this.draggable);
    }

    private onDragEnd(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
        if (!this.draggable || !this.boardFiller.canFill) {
            this.draggable.setPosition(this.spawnPosition.x, this.spawnPosition.y);
            this.draggable = null;
            return;
        }

        this.boardFiller.fill();
        this.destroyUsedFigure();
        this.createFigure(this.spawnPosition.x, this.spawnPosition.y);
    }

    private destroyUsedFigure() {
        if (!this.draggable)
            return;

        this.draggable.off('dragstart', this.onDragStart, this);
        this.draggable.off('drag', this.onDrag, this);
        this.draggable.off('dragend', this.onDragEnd, this);
        this.draggable.destroy();
        this.draggable = null;
    }
}