export class TextButton extends Phaser.GameObjects.Container {
    private background!: Phaser.GameObjects.Rectangle;
    private text!: Phaser.GameObjects.Text;

    constructor(scene: Phaser.Scene, x: number, y: number, text: string, onClick?: Function) {
        super(scene, x, y);

        this.createBackground(onClick);
        this.createText(text);

        this.add([this.background, this.text]);
        this.scene.add.existing(this);
    }

    private createBackground(onClick?: Function) {
        this.background = this.scene.add.rectangle(0, 0, 200, 50, 0x3498db);
        this.background.setInteractive();

        if (onClick != undefined)
            this.background.on('pointerup', onClick);

        this.background.on('pointerdown', () => { this.background.fillColor = 0x005497; });
        this.background.on('pointerover', () => { this.background.fillColor = 0x1276b9; });
        this.background.on('pointerout', () => { this.background.fillColor = 0x3498db; });
    }

    private createText(text: string) {
        this.text = this.scene.add.text(0, 0, text, { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
        this.text.setOrigin(0.5);
    }
}