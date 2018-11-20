import Orientation from './Orientation';


export default class CenterOrientation extends Orientation {

    constructor (owner) {
        super(owner);
        this.type = 'CenterOrientation';
    }

    position () {
        return this.owner.pos();
    }

}
