import { Orientation } from './Orientation';


export class CardinalOrientation extends Orientation {

    constructor (owner, direction) {
        super(owner);
        this.type = 'CardinalOrientation';
        this.direction = direction;
    }

    position () {
        let rect = this.owner.rect();
        let dx = 0.5, dy = 0.5;

        if ((this.direction & CardinalOrientation.NORTH)>0) {
            dy = 0;
        } else if ((this.direction & CardinalOrientation.SOUTH)>0) {
            dy = 1;
        }

        if ((this.direction & CardinalOrientation.EAST)>0) {
            dx = 1;
        } else if ((this.direction & CardinalOrientation.WEST)>0) {
            dx = 0;
        }

        return new createjs.Point(
            rect.x + dx * rect.width,
            rect.y + dy * rect.height
        );
    }

    static get NORTH () {
        return 1;
    }

    static get NORTH_EAST () {
        return this.NORTH | this.EAST;
    }

    static get EAST () {
        return 2;
    }

    static get SOUTH_EAST () {
        return this.SOUTH | this.EAST;
    }

    static get SOUTH () {
        return 4;
    }

    static get SOUTH_WEST () {
        return this.SOUTH | this.WEST;
    }

    static get WEST () {
        return 8;
    }

    static get NORTH_WEST () {
        return this.NORTH | this.WEST;
    }

}
