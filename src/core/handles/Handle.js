import DrawingObject from "../util/DrawingObject";

export default class Handle extends DrawingObject {

    constructor (parent, dx, dy) {
        super();
        this.type = 'handle';
        this.parent = parent;
        this.visible = false;
        this.updatePosition(parent.x + dx, parent.y + dy);
    }

    /**
     * @abstract
     */
    repaint () { }

    show () {
        this.visible = true;
        // Canvas().add(this);
        this.repaint();
    }

    hide () {
        this.visible = false;
        // Canvas().remove(this);
    }

}
