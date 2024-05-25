export class Timer extends Phaser.GameObjects.Text {
    public readonly completeEvent = "completeEvent";
    public readonly eventEmitter: Phaser.Events.EventEmitter;

    private duration!: number;
    private timer!: Phaser.Time.TimerEvent;
    private initialTime!: number;
    private remainingTime!: number;

    constructor(scene: Phaser.Scene, x: number, y: number, duration: number) {
        super(scene, x, y, '', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });

        this.duration = duration;
        this.eventEmitter = new Phaser.Events.EventEmitter();
        this.reset();

        this.scene.add.existing(this);
    }

    public reset() {
        this.initialTime = this.duration;
        this.remainingTime = this.initialTime;
        this.refreshText();
    }

    public start() {
        if (this.timer)
            return;

        this.timer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.onTick,
            callbackScope: this,
            loop: true
        });
    }

    public pause(state: boolean) {
        this.timer.paused = state;
    }

    public stop() {
        this.scene.time.removeEvent(this.timer);
    }

    private onTick() {
        this.remainingTime--;
        this.refreshText();
        this.verifyCompletion();
    }

    private refreshText() {
        const minutes = (Math.floor(this.remainingTime / 60)).toString().padStart(2, '0');
        const partInSeconds = (this.remainingTime % 60).toString().padStart(2, '0');

        this.text = `${minutes}:${partInSeconds}`;
    }

    private verifyCompletion() {
        if (this.remainingTime <= 0) {
            this.stop();
            this.onComplete();
        }
    }

    private onComplete() {
        this.eventEmitter.emit(this.completeEvent);
    }
}