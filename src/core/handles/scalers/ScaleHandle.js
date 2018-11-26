import { Handle } from '../Handle';
import { CardinalOrientation } from '../../orientations/CardinalOrientation';


export class ScaleHandle extends Handle {

    redraw () {
        this.graphics.clear().s('#939393').f('white').drawRect(-3, -3, 6, 6);
        this.hitArea.graphics.clear().f('black').drawRect(-5, -5, 10, 10);
    }

    onMouseDown (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressMove (event) {
        let east = (this.orientation.direction & CardinalOrientation.EAST) > 0;
        let south = (this.orientation.direction & CardinalOrientation.SOUTH) > 0;
        let west = (this.orientation.direction & CardinalOrientation.WEST) > 0;
        let north = (this.orientation.direction & CardinalOrientation.NORTH) > 0;

        this.owner.stretch(
            east * (event.stageX - this.mx) / this.parent.scaleX,
            south * (event.stageY - this.my) / this.parent.scaleY,
            west * (event.stageX - this.mx) / this.parent.scaleX,
            north * (event.stageY - this.my) / this.parent.scaleY,
        );
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressUp (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

}
