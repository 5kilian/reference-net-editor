import Figure from "./Figure";
import ConnectionHandle from "../handles/ConnectionHandle";

export default class Circle extends Figure {

    constructor (x, y) {
        super(x, y);
        this.type = 'circle';
        this.width = 20;
        this.height = 20;

        this.handles.push(new ConnectionHandle(this));
    }

    update () {

    }

    draw () {
        this.shape.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawEllipse(0, 0, this.width, this.height);
    }

}
