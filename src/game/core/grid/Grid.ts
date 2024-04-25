import {Cell} from "./Cell";
import { GridConfig } from "./GridConfig";
import {CellConfig} from "./CellConfig";

export class Grid extends Phaser.GameObjects.Container {
    private readonly rows: number;
    private readonly cols: number;
    private readonly borderColor: number;
    private readonly borderWidth: number;
    private readonly cellConfig: CellConfig;

    private cells!: Cell[][];
    private border!: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, config: GridConfig, position: Phaser.Math.Vector2) {
        super(scene, position.x, position.y);

        this.rows = config.rows;
        this.cols = config.cols;
        this.borderColor = config.borderColor;
        this.borderWidth = config.borderWidth;
        this.cellConfig = config.cell;

        this.createCells();
        this.createBorder();

        this.scene.add.existing(this);
    }

    public getCells() : Cell[][] {
        return this.cells;
    }

    private createCells() {
        this.cells = [];

        const offsetFromCenterX = this.cellConfig.width / 2;
        const offsetFromCenterY = this.cellConfig.height / 2;

        for (let i= 0; i < this.rows; i++) {
            this.cells[i] = [];

            for (let j= 0; j < this.cols; j++) {
                const x = offsetFromCenterX + j * this.cellConfig.width;
                const y = offsetFromCenterY + i * this.cellConfig.height;
                const cellPos = new Phaser.Math.Vector2(x, y);

                const cell= new Cell(this.scene, cellPos, this.cellConfig);

                this.cells[i][j] = cell;
                this.add(cell);
            }
        }
    }

    private createBorder() {
        this.border = new Phaser.GameObjects.Graphics(this.scene);
        this.drawRowsBorder();
        this.drawColsBorder();
        this.add(this.border);
    }

    private drawRowsBorder() {
        const cellWidth = this.cellConfig.width;
        const totalWidth = this.cols * cellWidth;

        for (let i= 1; i < this.rows; i++) {
            const y= i * cellWidth;

            this.border.lineStyle(this.borderWidth, this.borderColor);
            this.border.beginPath();
            this.border.moveTo(0, y);
            this.border.lineTo(totalWidth, y);
            this.border.closePath();
            this.border.strokePath();
        }
    }

    private drawColsBorder(): void {
        const cellHeight = this.cellConfig.height;
        const totalHeight= this.rows * cellHeight;

        for (let i= 1; i < this.cols; i++) {
            const x= i * cellHeight;

            this.border.lineStyle(this.borderWidth, this.borderColor);
            this.border.beginPath();
            this.border.moveTo(x, 0);
            this.border.lineTo(x, totalHeight);
            this.border.closePath();
            this.border.strokePath();
        }
    }
}