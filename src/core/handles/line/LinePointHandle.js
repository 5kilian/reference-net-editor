import { Handle } from '../Handle';
import { PointOrientation } from '../../orientations/PointOrientation';
import DrawingEvent from '../../drawing/DrawingEvent';

export class LinePointHandle extends Handle {

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
        this.point.setPosition(event.stageX, event.stageY);
        this.owner.redraw();
        DrawingEvent.emit('change selection');
    }

    onPressUp (event) {

    }

}
