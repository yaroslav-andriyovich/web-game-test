export const Textures = {
    pieces: {
        x: { key: 'x', url: './images/x.png' },
        o: { key: 'o', url: './images/o.png' },
    }
}

export type CellConfig = {
    width: number,
    height: number,
    overImageAlpha: number
};

export type GridConfig = {
    rows: number,
    cols: number,
    borderWidth: number,
    borderColor: number,
    cell: CellConfig
};