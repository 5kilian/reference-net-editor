/**
 * @abstract
 */
export class Orientation {

    constructor (owner) {
        this.type = 'orientation';
        this.owner = owner
    }

    /**
     * @abstract
     */
    position () {

    }

}