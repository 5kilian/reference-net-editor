import Figure from "./Figure";
import ConnectionHandle from "../handles/ConnectionHandle";

export default class Transition extends Figure {

    constructor (x, y) {
        super(x,y);
        this.type = 'transition';
        this.width = 24;
        this.height = 16;
    }

    update () {

    }

    repaint () {
        this.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawRect(0, 0, this.width, this.height);
    }

    handles () {
        return [ new ConnectionHandle(this, this.width / 2, this.height / 2) ];
    }

}
