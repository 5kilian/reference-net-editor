import { Orientation } from './Orientation';


export class FigureOrientation extends Orientation {

    constructor (owner) {
        super(owner);
    }

    position () {
        return this.point.setValues(this.owner.x, this.owner.y);
    }

}
