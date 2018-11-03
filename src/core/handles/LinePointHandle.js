import Handle from './Handle';
import PointOrientation from '../orientations/PointOrientation';
import DrawingEvent from '../Dispatcher';

export default class LinePointHandle extends Handle {

    constructor (owner, point) {
        super(owner, new PointOrientation(owner, point));
        this.point = point;
    }

    repaint () {
        this.graphics.clear().s('#939393').f('white')
            .drawCircle(0, 0, 3);
    }

    onMouseDown (event) {

    }

    onPressMove (event) {
        this.point.setPosition(event.stageX, event.stageY);
        this.owner.repaint();
        DrawingEvent().emit('change selection');
    }

    onPressUp (event) {

    }

}
