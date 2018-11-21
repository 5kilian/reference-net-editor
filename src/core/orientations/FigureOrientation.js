import { Orientation } from './Orientation';


export class FigureOrientation extends Orientation {

    constructor (owner) {
        super(owner);
        this.point = new createjs.Point(this.owner.x, this.owner.y);
    }

    position () {
        return this.point.setValues(this.owner.x, this.owner.y);
    }

}
