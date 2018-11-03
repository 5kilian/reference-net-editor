import DrawingObject from "../util/DrawingObject";
import DrawingEvent from '../Dispatcher';

/**
 * @abstract
 */
export default class Handle extends DrawingObject {

    constructor (owner, orientation) {
        super();
        this.type = 'Handle';
        this.owner = owner;
        this.orientation = orientation;
        this.updatePosition();
    }

    /**
     * @abstract
     */
    repaint () { }

    updatePosition () {
        let position = this.orientation.position();
        super.updatePosition(position.x, position.y);
    }

    show () {
        DrawingEvent().emit('add', this);
        this.repaint();
    }

    hide () {
        DrawingEvent().emit('remove', this);
    }

}
