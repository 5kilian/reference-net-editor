import { Handle } from '../Handle';

export class RotationHandle extends Handle {

    constructor (parent, orientation) {
        super(parent, orientation);
    }

    redraw () {
        this.graphics.clear().s('#939393').f('white')
            .drawCircle(0, 0, 3);
    }

    onMouseDown (event) {

    }

    onPressMove (event) {

    }

    onPressUp (event) {

    }

}
