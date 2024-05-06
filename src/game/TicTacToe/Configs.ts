export const Textures = {
    pieces: {
        x: { key: 'x', url: './TicTacToe/x.png' },
        o: { key: 'o', url: './TicTacToe/o.png' },
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