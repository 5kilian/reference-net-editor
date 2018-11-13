import Figure from "./Figure";

export default class Rectangle extends Figure {

    constructor (x, y) {
        super(x, y);
        this.type = 'rectangle';
        this.width = 42;
        this.height = 28;
    }

    update () {

    }

    repaint () {
        this.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawRect(0, 0, this.width, this.height);
    }

}
