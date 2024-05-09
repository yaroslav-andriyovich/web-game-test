import {SceneNames} from "./SceneNames";
import AnchorPlugin from "phaser3-rex-plugins/plugins/anchor-plugin";
import {Textures, Figure, Figures, CellConfig} from "../Stack";
import {Board} from "../Stack/Board";
import {BoardCell} from "../Stack/BoardCell";

export class Stack extends Phaser.Scene {
    private readonly backgroundColor = 0x221A33;

    private anchor!: AnchorPlugin;
    private background!: Phaser.GameObjects.Rectangle;
    private board1!: Board;
    private board2!: Board;
    private figure!: Figure;

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

    public update ()
    {
        this.figure.x = this.game.input.mousePointer.x - this.figure.width * 0.5;
        this.figure.y = this.game.input.mousePointer.y - this.figure.height;

        this.board1.clearHighlightedCells();
        this.tryHighlightCellsUnderFigure();
    }

    private tryHighlightCellsUnderFigure() {
        const cellOffset = CellConfig.cellSize * 0.5;
        const highlightedCells: BoardCell[] = [];
        const figureParts = this.figure.parts.flat();
        const figurePartsNumber = figureParts.length;

        for (const boardRow of this.board1.cells) {
            for (const cell of boardRow) {
                if (cell.isNotEmpty)
                    continue;

                for (const part of figureParts) {
                    const cellWorldMatrix = cell.getWorldTransformMatrix().decomposeMatrix();
                    const cellX = cellWorldMatrix.translateX + cellOffset;
                    const cellY = cellWorldMatrix.translateY + cellOffset;

                    const figurePartWorldMatrix = part.getWorldTransformMatrix().decomposeMatrix();
                    const figurePartX = figurePartWorldMatrix.translateX + cellOffset;
                    const figurePartY = figurePartWorldMatrix.translateY + cellOffset;

                    const distance = Phaser.Math.Distance.Between(cellX, cellY, figurePartX, figurePartY);

                    if (distance <= cellOffset && highlightedCells.indexOf(cell) === -1) {
                        highlightedCells.push(cell);
                        figureParts.splice(figureParts.indexOf(part), 1);
                    }
                }
            }
        }

        if (highlightedCells.length == figurePartsNumber) {
            highlightedCells.forEach(cell => {
                cell.highlight(this.figure.model.textureKey);
            });

            if (this.input.mousePointer.isDown) {
                highlightedCells.forEach(cell => {
                    cell.fill(this.figure.model.textureKey);
                });

                const x = this.figure.x;
                const y = this.figure.y;

                this.figure.destroy();
                this.figure = new Figure(this, x, y, Figures[Phaser.Math.Between(0, Figures.length - 1)]);
            }
        }
    }

    public create() {
        this.createBackground();
        this.createBoards();

        this.figure = new Figure(this, 1, 148, Figures[8]);

        /*for (let i = 0, k = 100, f = 0; i < Figures.length / 6; i++, k += 125) {
            for (let j = 0; f < Figures.length && j < 6; j++, f++) {
                const figure = new Figure(this, k, 12 + j * 120, Figures[f]);
                this.board1.highlightCells([new CellFillingData(6, 1, figure.model.textureKey)]);
                //this.board1.fillCells([new CellFillingData(6, 1, figure.model.textureKey)]);
            }
        }*/

        //this.board1.clearHighlightedCells();
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
        this.board1 = new Board(this, 10, 10);
        this.board2 = new Board(this, 10, 400);
    }
}