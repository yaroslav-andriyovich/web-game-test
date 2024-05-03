import {SceneNames} from "./SceneNames";

export class Stack extends Phaser.Scene {
    private grid!: Phaser.GameObjects.Grid;

    constructor() {
        super({key: SceneNames.Stack});
    }

    public preload() {
    }

    public create() {
    }
}