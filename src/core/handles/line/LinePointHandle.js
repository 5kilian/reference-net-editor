import { Handle } from '../Handle';
import { PointOrientation } from '../../orientations/PointOrientation';

export class LinePointHandle extends Handle {

    constructor (owner, point) {
        super(owner, new PointOrientation(owner, point));
        this.hitArea = new createjs.Shape(new createjs.Graphics().clear().f('#000').drawCircle(0, 0, 5));
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
