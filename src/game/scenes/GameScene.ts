export class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle;
    private image: Phaser.GameObjects.Image;
    private text: Phaser.GameObjects.Text;

    constructor() {
        super({ key: "game" });
    }

    public preload() {
        this.load.image('x', './x.png');
    }

    public create() {
        console.log("Game started!");

        this.text = this.add.text(360, 70, 'Test Scene', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000'
        }); 
        this.text.setOrigin(0.5);

        this.square = this.add.rectangle(360, 240, 100, 100, 0xff0000);
        this.square.setInteractive();
        this.square.on('pointerdown', () => {
            const randomColor = Phaser.Display.Color.RandomRGB();
            this.square.setFillStyle(randomColor.color);
        });
        
        this.image = this.add.image(this.square.x, this.square.y, 'x');
        this.image.setOrigin(0.5);
        this.image.setTintFill(0xffffff)
        this.image.displayWidth = this.square.width / 2;
        this.image.displayHeight = this.square.height / 2;
    }
}