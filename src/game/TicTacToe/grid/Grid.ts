import {Cell} from "./cell";
import {GridConfig, CellConfig} from "../Configs";
import {CellCoords} from "../../../common/CellCoords";

export class Grid extends Phaser.GameObjects.Container {
    public readonly rows: number;
    public readonly cols: number;

    private readonly borderWidth: number;
    private readonly borderColor: number;
    private readonly cellConfig: CellConfig;

    private cells!: Cell[][];
    private border!: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, x: number, y: number, config: GridConfig) {
        super(scene, x, y);

        this.rows = config.rows;
        this.cols = config.cols;
        this.borderWidth = config.borderWidth;
        this.borderColor = config.borderColor;
        this.cellConfig = config.cell;

        this.createCells();
        this.createBorder();

        this.scene.add.existing(this);
    }

    public getCellAt(cellCord: CellCoords) {
        return this.cells[cellCord.row][cellCord.col];
    }

    public displayWinCells(winCells: Cell[]) {
        this.cells.forEach((row) => {
            row.forEach((cell) => {
                if (!winCells.some(winCell => winCell === cell))
                    cell.markLose();
            });
        });
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
                const cellCord = new CellCoords(i, j);
                const cell= new Cell(this.scene, cellPos, cellCord, this.cellConfig);

                this.cells[i][j] = cell;
                this.add(cell);
            }
        }
    }

    private createBorder() {
        this.border = new Phaser.GameObjects.Graphics(this.scene);
        this.border.lineStyle(this.borderWidth, this.borderColor);

        this.drawRowsBorder();
        this.drawColsBorder();
        this.add(this.border);
    }

    private drawRowsBorder() {
        const cellWidth = this.cellConfig.width;
        const totalWidth = this.cols * cellWidth;

        for (let i= 1; i < this.rows; i++) {
            const y= i * cellWidth;

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

            this.border.beginPath();
            this.border.moveTo(x, 0);
            this.border.lineTo(x, totalHeight);
            this.border.closePath();
            this.border.strokePath();
        }
    }
}