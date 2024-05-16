import {Figures} from "./Configs";

export class AvailableFigureIndexesProvider {
    public readonly figureAddEvent = "figureAdd";
    public readonly eventEmitter: Phaser.Events.EventEmitter;

    private readonly figures!: number[];

    constructor() {
        this.eventEmitter = new Phaser.Events.EventEmitter();
        this.figures = [];
    }

    public get hasAvailable() {
        return this.figures.length !== 0;
    }

    public addFigure(figureIndex: number) {
        if (figureIndex < 0 || figureIndex >= Figures.length)
            throw new Error("Incorrect figure index.");

        this.figures.push(figureIndex);
        this.eventEmitter.emit(this.figureAddEvent);
    }

    public getNext(): number {
        if (!this.hasAvailable)
            throw new Error("Available figures array is empty.");

        const utilizedFigure = this.figures[0];

        this.figures.splice(0, 1);

        return utilizedFigure;
    }
}