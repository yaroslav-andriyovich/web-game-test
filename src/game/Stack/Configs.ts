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
    bgColor: 0x141024,
    cellsCount: 8,
    cellsPadding: 4,
    cellColor: { tl: 0x354369, tr: 0x354369, bl: 0x28334f, br: 0x28334f }
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
        textureKey: Textures.aqua.key,
        cells: [
            [ 0, 1, 0 ],
            [ 1, 1, 1 ]
        ]
    },
    {
        textureKey: Textures.aqua.key,
        cells: [
            [ 0, 1, 0 ],
            [ 1, 1, 1 ]
        ]
    },
    {
        textureKey: Textures.aqua.key,
        cells: [
            [ 1, 0 ],
            [ 1, 1 ],
            [ 1, 0 ]
        ]
    },
    {
        textureKey: Textures.aqua.key,
        cells: [
            [ 1, 1, 1 ],
            [ 0, 1, 0 ]
        ]
    },
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
        textureKey: Textures.blueviolet.key,
        cells: [
            [ 0, 1, 1 ],
            [ 1, 1, 0 ]
        ]
    },
    {
        textureKey: Textures.blueviolet.key,
        cells: [
            [ 1, 0 ],
            [ 1, 1 ],
            [ 0, 1 ]
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
        textureKey: Textures.green.key,
        cells: [
            [ 1 ],
            [ 1 ],
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
    },
    {
        textureKey: Textures.orange.key,
        cells: [
            [ 0, 1 ],
            [ 0, 1 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.orange.key,
        cells: [
            [ 1, 1 ],
            [ 1, 0 ],
            [ 1, 0 ]
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
        textureKey: Textures.pink.key,
        cells: [
            [ 1, 0 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.pink.key,
        cells: [
            [ 0, 1 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.pink.key,
        cells: [
            [ 1, 1 ],
            [ 0, 1 ]
        ]
    },
    {
        textureKey: Textures.purple.key,
        cells: [
            [ 1 ],
            [ 1 ],
            [ 1 ],
            [ 1 ]
        ]
    },
    {
        textureKey: Textures.purple.key,
        cells: [ [ 1, 1, 1, 1 ] ]
    },
    {
        textureKey: Textures.red.key,
        cells: [
            [ 0, 1 ],
            [ 1, 1 ],
            [ 1, 0 ]
        ]
    },
    {
        textureKey: Textures.red.key,
        cells: [
            [ 1, 1, 0 ],
            [ 0, 1, 1 ]
        ]
    },
    {
        textureKey: Textures.red.key,
        cells: [
            [ 0, 1 ],
            [ 1, 1 ],
            [ 1, 0 ]
        ]
    },
    {
        textureKey: Textures.yellow.key,
        cells: [
            [ 1, 1 ],
            [ 0, 1 ],
            [ 0, 1 ]
        ]
    },
    {
        textureKey: Textures.yellow.key,
        cells: [
            [ 1, 0 ],
            [ 1, 0 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.yellow.key,
        cells: [
            [ 1, 1, 1 ],
            [ 1, 0, 0 ]
        ]
    }
];