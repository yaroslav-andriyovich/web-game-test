import {CellConfig} from "./CellConfig";

export interface GridConfig {
    rows: number;
    cols: number;
    borderColor: number;
    borderWidth: number;
    cell: CellConfig;
}