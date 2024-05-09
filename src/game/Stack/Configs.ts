const texturePath:string = "./Stack/cell/";

export const Textures = {
    bg: { key: "bg", url: texturePath + "bg.png" },
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
    cellsPadding: 4
};

export const CellConfig = {
    cellSize: 35,
    cellOffset: 2
};

export type FigureModel = {
    textureKey: string;
    parts: number[][];
};

export const Figures: FigureModel[] = [
    {
        textureKey: Textures.aqua.key,
        parts: [
            [ 0, 1, 0 ],
            [ 1, 1, 1 ]
        ]
    },
    {
        textureKey: Textures.aqua.key,
        parts: [
            [ 1, 1, 1 ],
            [ 0, 1, 0 ]
        ]
    },
    {
        textureKey: Textures.aqua.key,
        parts: [
            [ 1, 0 ],
            [ 1, 1 ],
            [ 1, 0 ]
        ]
    },
    {
        textureKey: Textures.aqua.key,
        parts: [
            [ 0, 1 ],
            [ 1, 1 ],
            [ 0, 1 ]
        ]
    },
    {
        textureKey: Textures.blue.key,
        parts: [ [ 1 ] ]
    },
    {
        textureKey: Textures.blue.key,
        parts: [
            [ 1, 1, 1 ],
            [ 1, 1, 1 ],
            [ 1, 1, 1 ]
        ]
    },
    {
        textureKey: Textures.blueviolet.key,
        parts: [
            [ 0, 1, 1 ],
            [ 1, 1, 0 ]
        ]
    },
    {
        textureKey: Textures.blueviolet.key,
        parts: [
            [ 1, 0 ],
            [ 1, 1 ],
            [ 0, 1 ]
        ]
    },
    {
        textureKey: Textures.green.key,
        parts: [
            [ 1, 1 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.green.key,
        parts: [
            [ 1 ],
            [ 1 ],
            [ 1 ],
            [ 1 ]
        ]
    },
    {
        textureKey: Textures.orange.key,
        parts: [
            [ 1, 1, 1 ],
            [ 0, 0, 1 ]
        ]
    },
    {
        textureKey: Textures.orange.key,
        parts: [
            [ 0, 1 ],
            [ 0, 1 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.orange.key,
        parts: [
            [ 1, 1 ],
            [ 1, 0 ],
            [ 1, 0 ]
        ]
    },
    {
        textureKey: Textures.pink.key,
        parts: [ [ 1, 1 ] ]
    },
    {
        textureKey: Textures.pink.key,
        parts: [
            [ 1 ],
            [ 1 ]
        ]
    },
    {
        textureKey: Textures.pink.key,
        parts: [
            [ 1, 0 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.pink.key,
        parts: [
            [ 0, 1 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.pink.key,
        parts: [
            [ 1, 1 ],
            [ 0, 1 ]
        ]
    },
    {
        textureKey: Textures.pink.key,
        parts: [
            [ 1, 1 ],
            [ 1, 0 ]
        ]
    },
    {
        textureKey: Textures.purple.key,
        parts: [
            [ 1 ],
            [ 1 ],
            [ 1 ],
            [ 1 ]
        ]
    },
    {
        textureKey: Textures.purple.key,
        parts: [ [ 1, 1, 1, 1 ] ]
    },
    {
        textureKey: Textures.red.key,
        parts: [
            [ 0, 1 ],
            [ 1, 1 ],
            [ 1, 0 ]
        ]
    },
    {
        textureKey: Textures.red.key,
        parts: [
            [ 1, 1, 0 ],
            [ 0, 1, 1 ]
        ]
    },
    {
        textureKey: Textures.red.key,
        parts: [
            [ 0, 1 ],
            [ 1, 1 ],
            [ 1, 0 ]
        ]
    },
    {
        textureKey: Textures.yellow.key,
        parts: [
            [ 1, 1 ],
            [ 0, 1 ],
            [ 0, 1 ]
        ]
    },
    {
        textureKey: Textures.yellow.key,
        parts: [
            [ 1, 0 ],
            [ 1, 0 ],
            [ 1, 1 ]
        ]
    },
    {
        textureKey: Textures.yellow.key,
        parts: [
            [ 1, 1, 1 ],
            [ 1, 0, 0 ]
        ]
    }
];