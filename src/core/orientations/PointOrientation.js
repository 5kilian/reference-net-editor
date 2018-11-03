import Orientation from './Orientation';


export default class PointOrientation extends Orientation {

    constructor (owner, point) {
        super(owner);
        this.type = 'PointOrientation';
        this.point = point;
    }

    updatePosition (x, y) {
        this.point.x = x;
        this.point.y = y;
    }

    position () {
        return this.point;
    }

}
