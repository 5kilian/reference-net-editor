import { CardinalConnector } from '../handles/connectors/CardinalConnector';
import { CenterConnector } from '../handles/connectors/CenterConnector';
import { FigureConnector } from '../handles/connectors/FigureConnector';
import { CardinalOrientation } from '../orientations/CardinalOrientation';
import { Figure } from "./Figure";

export class Rectangle extends Figure {

    constructor (x, y) {
        super(x, y);

        this.connectors = [
            new FigureConnector(this),
            new CardinalConnector(this, CardinalOrientation.NORTH),
            new CardinalConnector(this, CardinalOrientation.EAST),
            new CardinalConnector(this, CardinalOrientation.SOUTH),
            new CardinalConnector(this, CardinalOrientation.WEST),
            new CenterConnector(this),
        ]
    }

    update () {

    }

    redraw () {
        this.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawRect(0, 0, this.width, this.height);
    }

}
