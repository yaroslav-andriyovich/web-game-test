import {Cell, CellCord} from "./cell";
import {GridConfig, CellConfig} from "../Configs";

export class Grid extends Phaser.GameObjects.Container {
    public readonly rows: number;
    public readonly cols: number;

    private readonly borderWidth: number;
    private readonly borderColor: number;
    private readonly cellConfig: CellConfig;

    private cells!: Cell[][];
    private border!: Phaser.GameObjects.Graphics;

    constructor(scene: Phaser.Scene, config: GridConfig, position: Phaser.Math.Vector2) {
        super(scene, position.x, position.y);

        this.rows = config.rows;
        this.cols = config.cols;
        this.borderWidth = config.borderWidth;
        this.borderColor = config.borderColor;
        this.cellConfig = config.cell;

        this.createCells();
        this.createBorder();

        this.scene.add.existing(this);
    }

    public getCellAt(cellCord: CellCord) {
        return this.cells[cellCord.rowPos][cellCord.colPos];
    }

    public displayWinCells(winCells: Cell[]) {
        for (let i= 0; i < this.rows; i++) {
            for (let j= 0; j < this.cols; j++) {
                let cell = this.cells[i][j];

                if (!winCells.some(winCell => winCell === cell))
                    cell.markLose();
            }
        }
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
                const cellCord = new CellCord(i, j);
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