import { FigureOrientation } from '../../orientations/FigureOrientation';
import { Selector } from "./Selector";

export class FigureSelector extends Selector {

    constructor (owner) {
        super(owner, new FigureOrientation(owner));
    }

    updatePosition () {
        super.updatePosition();
        this.redraw();
    }

    redraw () {
        this.graphics.clear().s('#0952e6').f('transparent').ss(3).drawRect(0, 0, this.owner.width, this.owner.height);
    }

}
