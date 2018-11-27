import { Handle } from '../Handle';
import { PointOrientation } from '../../orientations/PointOrientation';
import DrawingEvent from '../../drawing/DrawingEvent';

export class LinePointHandle extends Handle {

    constructor (owner, point) {
        super(owner, new PointOrientation(owner, point));
        this.point = point;
        this.hide();
    }

    redraw () {
        this.graphics.clear().s('#939393').f('white')
            .drawCircle(0, 0, 3);
    }

    onMouseDown (event) {

    }

    onPressMove (event) {
        this.point.setValues(event.stageX, event.stageY);
        this.owner.onMove();
    }

    onPressUp (event) {

    }

}
