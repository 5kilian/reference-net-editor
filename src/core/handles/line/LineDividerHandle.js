import { Handle } from '../Handle';
import { PointOrientation } from '../../orientations/PointOrientation';


export class LineDividerHandle extends Handle {

    constructor (owner, point) {
        super(owner, new PointOrientation(owner, point));
        this.point = point;
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
