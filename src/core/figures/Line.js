import Figure from "./Figure";

export default class Line extends Figure {

    constructor (x, y) {
        super(x, y);
        this.type = 'line';
        this.width = 20;
        this.height = 20;
    }

    update () {

    }

    repaint () {
        this.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawEllipse(0, 0, this.rect.width, this.rect.height);
    }

}
