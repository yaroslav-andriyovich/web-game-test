import UIPlugin from "phaser3-rex-plugins/templates/ui/ui-plugin";
import {Figure} from "./Figure";
import {CellConfig} from "./Configs";

export class FigureContainer {
    private readonly sizer: UIPlugin.Sizer;
    private readonly itemSpace: number = 150;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.sizer = scene.rexUI.add.sizer({
            x: x, y: y,
            orientation: 'x',
            space: { item: this.itemSpace }
        }).setOrigin(0);
    }

    public get gameObject() {
        return this.sizer;
    }

    public get maxWidth() {
        return (4 * CellConfig.cellSize) + (4 * CellConfig.cellOffset) + (3 * (this.itemSpace / 2));
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