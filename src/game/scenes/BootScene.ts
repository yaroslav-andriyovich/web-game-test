import {SceneNames} from "./SceneNames";

export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: SceneNames.Boot });
    }

    public preload() {
    }

    public create() {
        this.scene.start(SceneNames.Game);
    }
}