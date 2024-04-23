export class BootScene extends Phaser.Scene {
    public preload() {
    }

    public create() {
        this.scene.start('game');
    }
}