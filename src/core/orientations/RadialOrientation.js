import { Orientation } from './Orientation';


export class RadialOrientation extends Orientation {

    constructor (owner, degree) {
        super(owner);
        this.degree = degree;
        this.radians = degree * Math.PI / 180;
    }

    position () {
        let center = this.owner.center();
        return this.point.setValues(
            center.x + this.owner.width/2 * Math.cos(this.radians),
            center.y + this.owner.height/2 * Math.sin(this.radians)
        );
    }

    static get NORTH () {
        return 90;
    }

    static get NORTH_EAST () {
        return 45;
    }

    static get EAST () {
        return 0;
    }

    static get SOUTH_EAST () {
        return 315;
    }

    static get SOUTH () {
        return 270;
    }

    static get SOUTH_WEST () {
        return 225;
    }

    static get WEST () {
        return 180;
    }

    static get NORTH_WEST () {
        return 135;
    }

}
