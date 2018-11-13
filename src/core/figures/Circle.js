import Figure from "./Figure";

export default class Circle extends Figure {

    constructor (x, y) {
        super(x, y);
        this.type = 'circle';
        this.width = 40;
        this.height = 40;
    }

    update () {

    }

    repaint () {
        this.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawEllipse(0, 0, this.width, this.height);
    }

}
