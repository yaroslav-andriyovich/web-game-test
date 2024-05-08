import {CellCoords} from "../../common/CellCoords";

export class CellFillingData extends CellCoords {
    public readonly imageKey: string;

    constructor(row: number, col: number, image: string) {
        super(row, col);

        this.imageKey = image;
    }
}