import { CardinalConnectionHandle } from '../handles/CardinalConnectionHandle';
import { CenterConnectionHandle } from '../handles/CenterConnectionHandle';
import { FigureConnectionHandle } from '../handles/FigureConnectionHandle';
import { CardinalOrientation } from '../orientations/CardinalOrientation';
import { Figure } from "./Figure";

export class Rectangle extends Figure {

    constructor (x, y) {
        super(x, y);
        this.width = 42;
        this.height = 28;

        this.handles = [
            new FigureConnectionHandle(this),
            new CardinalConnectionHandle(this, CardinalOrientation.NORTH),
            new CardinalConnectionHandle(this, CardinalOrientation.EAST),
            new CardinalConnectionHandle(this, CardinalOrientation.SOUTH),
            new CardinalConnectionHandle(this, CardinalOrientation.WEST),
            new CenterConnectionHandle(this),
        ]
    }

    update () {

    }

    redraw () {
        this.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawRect(0, 0, this.width, this.height);
    }

}
