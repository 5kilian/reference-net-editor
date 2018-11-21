import { Handle } from './Handle';
import { CardinalOrientation } from '../orientations/CardinalOrientation';

export class CardinalScaleHandle extends Handle {

    constructor (parent, orientation) {
        super(parent, new CardinalOrientation(parent, orientation));
    }

    redraw () {
        this.graphics.clear().s('#939393').f('white')
            .drawRect(-3, -3, 6, 6);
    }

    onMouseDown (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressMove (event) {
        this.owner.stretch(
            ((this.orientation.direction & CardinalOrientation.EAST) > 0) * (event.stageX - this.mx),
            ((this.orientation.direction & CardinalOrientation.SOUTH) > 0) * (event.stageY - this.my),
            ((this.orientation.direction & CardinalOrientation.WEST) > 0) * (event.stageX - this.mx),
            ((this.orientation.direction & CardinalOrientation.NORTH) > 0) * (event.stageY - this.my),
        );
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressUp (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onClick (event) {
    }

    onDoubleClick (event) {
    }

    onHide () {
    }

    onMouseMove (event) {
    }

    onMouseOut (event) {
    }

    onMouseOver (event) {
    }

    onShow () {
    }

    update () {
    }
}
