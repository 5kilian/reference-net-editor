import DrawingEvent from '../drawing/DrawingEvent';
import { DrawingShape } from '../drawing/DrawingShape';


/**
 * @abstract
 */
export class Handle extends DrawingShape {

    constructor (owner, orientation) {
        super();
        this.owner = owner;
        this.orientation = orientation;
        this.hitArea = new createjs.Shape();
        this.updatePosition();
        this.redraw();
    }

    update () { }

    redraw () { }

    updatePosition () {
        let position = this.orientation.position();
        super.updatePosition(position.x, position.y);
    }

    onClick (event) { }

    onDoubleClick (event) { }

    onShow () {
        this.updatePosition();
        DrawingEvent.emit('add', this);
    }

    onHide () {
        DrawingEvent.emit('remove', this);
    }

    onMouseDown (event) { }

    onMouseMove (event) { }

    onMouseOut (event) { }

    onMouseOver (event) { }

    onPressMove (event) { }

    onPressUp (event) { }

}
