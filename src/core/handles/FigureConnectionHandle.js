import { FigureOrientation } from '../orientations/FigureOrientation';
import { ConnectionHandle } from "./ConnectionHandle";

export class FigureConnectionHandle extends ConnectionHandle {

    constructor (owner) {
        super(owner, new FigureOrientation(owner));
        this.hitArea = new createjs.Shape(new createjs.Graphics().clear().f('#000').drawRect(-5, -5, this.owner.width+10, this.owner.height+10));
    }

    redraw () {
        this.graphics.clear().s('#00e600').f('transparent').ss(3).drawRect(0, 0, this.owner.width, this.owner.height);
    }

}
