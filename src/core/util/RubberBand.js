import DrawingEvent from '../drawing/DrawingEvent';
import { DrawingShape } from '../drawing/DrawingShape';


export class RubberBand extends DrawingShape {

    constructor () {
        super();
        this.type = 'rubberband';
        this.src = new createjs.Point();
        this.dest = new createjs.Point();
        this.hide();
    }

    update () {

    }

    updatePosition () {
        super.updatePosition(Math.min(this.src.x, this.dest.x), Math.min(this.src.y, this.dest.y));
        this.width = Math.abs(this.src.x - this.dest.x);
        this.height = Math.abs(this.src.y - this.dest.y);
    }

    setSrc (x, y) {
        this.src.setValues(x, y);
        this.dest.setValues(x, y);
        this.updatePosition();
    }

    setDest (x, y) {
        this.dest.setValues(x, y);
        this.updatePosition();
    }

    redraw () {
        this.graphics.clear().s('gray').f('transparent').drawRect(0, 0, this.width, this.height);
    }

    rect () {
        return this.boundingBox.setValues(this.x, this.y, this.width, this.height);
    }

    onClick (event) { }

    onDoubleClick (event) { }

    onHide () { }

    onMouseDown (event) { }

    onMouseMove (event) { }

    onMouseOut (event) { }

    onMouseOver (event) { }

    onPressMove (event) { }

    onPressUp (event) { }

    onShow () {
        DrawingEvent.emit('top', this);
    }

}
