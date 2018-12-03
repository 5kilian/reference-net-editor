import { Orientation } from './Orientation';


export class PointOrientation extends Orientation {

    constructor (owner, point) {
        super(owner)
        this.point.copy(point);
    }

    updatePosition (x, y) {
        this.point.x = x;
        this.point.y = y;
    }

    position () {
        return this.point;
    }

}
