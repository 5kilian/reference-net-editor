import { Point } from '../util/Point';


/**
 * @abstract
 */
export class Orientation {

    constructor (owner) {
        this.owner = owner;
        this.point = new Point();
    }

    /**
     * @abstract
     */
    position () {

    }

}