import { CenterConnector } from '../handles/connectors/CenterConnector';
import { FigureConnector } from '../handles/connectors/FigureConnector';
import { Figure } from "./Figure";
import { RadialConnector } from "../handles/connectors/RadialConnector";
import { RadialOrientation } from "../orientations/RadialOrientation";


export class Ellipse extends Figure {

    constructor (x, y) {
        super(x, y);

        this.connectors = [
            new FigureConnector(this),
            new RadialConnector(this, RadialOrientation.NORTH),
            new RadialConnector(this, RadialOrientation.NORTH_EAST),
            new RadialConnector(this, RadialOrientation.EAST),
            new RadialConnector(this, RadialOrientation.SOUTH_EAST),
            new RadialConnector(this, RadialOrientation.SOUTH),
            new RadialConnector(this, RadialOrientation.SOUTH_WEST),
            new RadialConnector(this, RadialOrientation.WEST),
            new RadialConnector(this, RadialOrientation.NORTH_WEST),
            new CenterConnector(this),
        ]
    }

    update () {

    }

    redraw () {
        this.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawEllipse(0, 0, this.width, this.height);
    }

}
