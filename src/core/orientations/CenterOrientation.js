import { Orientation } from './Orientation';


export class CenterOrientation extends Orientation {

    constructor (owner) {
        super(owner);
    }

    position () {
        return this.owner.center();
    }

}
