const texturePath:string = "./Stack/cell/";

export const Textures = {
    bg: { key: "bg", url: texturePath + "aqua.png" },
    aqua: { key: "aqua", url: texturePath + "aqua.png" },
    blue: { key: "blue", url: texturePath + "blue.png" },
    blueviolet: { key: "blueviolet", url: texturePath + "blueviolet.png" },
    green: { key: "green", url: texturePath + "green.png" },
    orange: { key: "orange", url: texturePath + "orange.png" },
    pink: { key: "pink", url: texturePath + "pink.png" },
    purple: { key: "purple", url: texturePath + "purple.png" },
    red: { key: "red", url: texturePath + "red.png" },
    yellow: { key: "yellow", url: texturePath + "yellow.png" },
};

export const BoardConfig = {
    cellsCount: 8,
    cellsPadding: 2
};

export const CellConfig = {
    cellSize: 25,
    cellOffset: 2
};

export type ShapeModel = {
    textureKey: string;
    cells: number[][];
};

export const Shapes: ShapeModel[] = [
    {
        textureKey: Textures.blue.key,
        cells: [ [ 1 ] ]
    },
    {
        textureKey: Textures.blue.key,
        cells: [
            [ 1, 1, 1 ],
            [ 1, 1, 1 ],
            [ 1, 1, 1 ]
        ]
    },
    {
        textureKey: Textures.green.key,
        cells: [
            [ 1, 1 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.pink.key,
        cells: [ [ 1, 1 ] ]
    },
    {
        textureKey: Textures.pink.key,
        cells: [
            [ 1 ],
            [ 1 ]
        ]
    },
    {
        textureKey: Textures.orange.key,
        cells: [
            [ 1, 1, 1 ],
            [ 0, 0, 1 ]
        ]
    }
];