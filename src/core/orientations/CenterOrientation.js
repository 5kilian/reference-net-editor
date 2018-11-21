import { Orientation } from './Orientation';


export class CenterOrientation extends Orientation {

    constructor (owner) {
        super(owner);
        this.type = 'CenterOrientation';
    }

    position () {
        return this.owner.center();
    }

}
