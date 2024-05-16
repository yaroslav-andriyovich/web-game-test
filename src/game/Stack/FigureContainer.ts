import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import {Figure} from "./Figure";

export class FigureContainer {
    private readonly sizer: UIPlugin.Sizer;

    constructor(scene: Phaser.Scene) {
        this.sizer = scene.rexUI.add.sizer({
            x: 10, y: 480,
            orientation: 'x',
            space: { item: 130 }
        }).setOrigin(0);
    }

    public get size() {
        return this.sizer.getChildren().length;
    }

    public add(figure: Figure) {
        this.sizer.add(figure, { expand: true })
            .layout();
    }

    public remove(figure: Figure) {
        this.sizer.remove(figure)
            .layout();
    }

    public resetFigurePositions() {
        this.sizer.layout();
    }

    public get figures() {
        return this.sizer
            .getChildren()
            .filter((child: any) =>
                child instanceof Figure) as Figure[];
    }
}