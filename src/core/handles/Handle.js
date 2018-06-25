import DrawingObject from "../DrawingObject";

export default class Handle extends DrawingObject {

    constructor (parent) {
        super();
        this.type = 'handle';
        this.parent = parent;
        this.visible = false;
    }

    show () {
        this.visible = true;
        this.draw();
    }

    hide () {
        this.visible = false;
        this.draw();
    }

}
