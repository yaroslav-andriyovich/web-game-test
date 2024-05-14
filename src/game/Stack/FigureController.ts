import {Board} from "./Board";
import DragPlugin from "phaser3-rex-plugins/plugins/drag-plugin";
import {CellConfig, Figure, Figures} from "./index";
import {CellCoords} from "../../common/CellCoords";
import {Cell} from "../TicTacToe/grid/cell";

export class FigureController {
    private readonly scene: Phaser.Scene;
    private readonly board: Board;
    private readonly dragPlugin: DragPlugin;

    private draggable!: Figure;
    private highlightedCells!: CellCoords[];
    private canFill!: boolean;
    private spawnPosition!: Phaser.Math.Vector2;

    constructor(scene: Phaser.Scene, board: Board) {
        this.scene = scene;
        this.board = board;
        this.dragPlugin = this.scene.plugins.get('rexDrag') as DragPlugin;
        this.highlightedCells = [];
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
        this.createFigure(this.spawnPosition.x, this.spawnPosition.y-200);
        this.createFigure(this.spawnPosition.x, this.spawnPosition.y-400);
    }

    private createFigure(x: number, y: number) {
        const model = Figures[Phaser.Math.Between(0, Figures.length - 1)]
        const figure = new Figure(this.scene, x, y, model);

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
        this.clearHighlightedCellsArray();
        this.checkBoardFilling();
    }

    private clearHighlightedCellsArray() {
        this.highlightedCells = [];
    }

    private checkBoardFilling() {
        const cellOffset = CellConfig.cellSize * 0.5;
        const figureParts = this.draggable.parts.flat();
        const figurePartsNumber = figureParts.length;

        for (const boardRow of this.board.cells) {
            for (const cell of boardRow) {
                if (cell.isNotEmpty)
                    continue;

                const cellWorldMatrix = cell.getWorldTransformMatrix().decomposeMatrix();
                const cellX = cellWorldMatrix.translateX + cellOffset;
                const cellY = cellWorldMatrix.translateY + cellOffset;

                for (const part of figureParts) {
                    const figurePartWorldMatrix = part.getWorldTransformMatrix().decomposeMatrix();
                    const figurePartX = figurePartWorldMatrix.translateX + cellOffset;
                    const figurePartY = figurePartWorldMatrix.translateY + cellOffset;

                    const distance = Phaser.Math.Distance.Between(cellX, cellY, figurePartX, figurePartY);
                    const coords = cell.coords;

                    if (distance <= cellOffset && this.highlightedCells.indexOf(coords) === -1) {
                        this.highlightedCells.push(coords);
                        figureParts.splice(figureParts.indexOf(part), 1);
                    }
                }
            }
        }

        if (this.highlightedCells.length == figurePartsNumber) {
            this.canFill = true;
            this.board.highlightCells(this.highlightedCells, this.draggable.model.textureKey);
            this.checkRows();
        } else {
            this.canFill = false;
        }
    }

    private checkRows() {
        let comboCols: CellCoords[] = [];

        for (let i = 0; i < this.board.cells[0].length; i++) {
            const coords = [];

            for (let j = 0; j < this.board.cells.length; j++) {
                const cell = this.board.cells[j][i];

                const index = this.highlightedCells.indexOf(cell.coords);

                if (cell.isEmpty && index !== -1) {
                    coords.push(this.highlightedCells.at(index));
                }
                else if (cell.isNotEmpty) {
                    coords.push(cell.coords);
                } else
                    break;
            }

            if (coords.length == this.board.cells[i].length)
                comboCols = comboCols.concat(coords);
        }

        let comboRows: CellCoords[] = [];

        for (let i = 0; i < this.board.cells.length; i++) {
            const coords = [];

            for (let j = 0; j < this.board.cells[i].length; j++) {
                const cell = this.board.cells[i][j];

                const index = this.highlightedCells.indexOf(cell.coords);

                if (cell.isEmpty && index !== -1) {
                    coords.push(this.highlightedCells.at(index));
                }
                else if (cell.isNotEmpty) {
                    coords.push(cell.coords);
                } else
                    break;
            }

            if (coords.length == this.board.cells[i].length)
                comboRows = comboRows.concat(coords);
        }

        this.board.highlightComboCells(comboCols.concat(comboRows), this.draggable.model.textureKey);
    }

    private onDragEnd(pointer: Phaser.Input.Pointer, dragX: number, dragY: number) {
        if (!this.draggable || !this.canFill) {
            this.draggable.setPosition(this.spawnPosition.x, this.spawnPosition.y);
            this.draggable = null;
            return;
        }

        this.fillBoard();
        this.destroyUsedFigure();
        this.createFigure(this.spawnPosition.x, this.spawnPosition.y);
    }

    private fillBoard() {
        this.board.fillCells(this.highlightedCells, this.draggable.model.textureKey);
        this.clearHighlightedCellsArray();
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