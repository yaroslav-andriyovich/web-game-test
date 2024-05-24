import {Sizer} from "phaser3-rex-plugins/templates/ui/ui-components";
import {Figure} from "./Figure";

export class FigureContainer extends Sizer {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.setOrientation("x");
        this.setItemSpacing(200);
        this.setOrigin(0.5);

        this.scene.add.existing(this);
    }

    public get figuresNumber() {
        return this.getChildren().length;
    }

    public addFigure(figure: Figure) {
        this.setFigureScale(figure);

        this.add(figure, { expand: false })
            .layout();
    }

    public removeFigure(figure: Figure) {
        this.remove(figure)
            .layout();
    }

    public resetFigurePositions() {
        this.getChildren().forEach((figure: Figure) => {
            this.setFigureScale(figure);
        });

        this.layout();
    }

    public get figures() {
        return this.getChildren()
            .filter((child: any) =>
                child instanceof Figure) as Figure[];
    }

    private setFigureScale(figure: Figure) {
        figure.setScale(this.scale);
    }
}