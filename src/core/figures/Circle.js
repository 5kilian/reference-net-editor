import CenterConnectionHandle from '../handles/CenterConnectionHandle';
import Figure from "./Figure";
import RadialConnectionHandle from "../handles/RadialConnectionHandle";
import RadialOrientation from "../orientations/RadialOrientation";


export default class Circle extends Figure {

    constructor (x, y) {
        super(x, y);
        this.type = 'circle';
        this.width = 40;
        this.height = 40;

        this.handles = [
            new RadialConnectionHandle(this, RadialOrientation.NORTH),
            new RadialConnectionHandle(this, RadialOrientation.NORTH_EAST),
            new RadialConnectionHandle(this, RadialOrientation.EAST),
            new RadialConnectionHandle(this, RadialOrientation.SOUTH_EAST),
            new RadialConnectionHandle(this, RadialOrientation.SOUTH),
            new RadialConnectionHandle(this, RadialOrientation.SOUTH_WEST),
            new RadialConnectionHandle(this, RadialOrientation.WEST),
            new RadialConnectionHandle(this, RadialOrientation.NORTH_WEST),
            new CenterConnectionHandle(this),
        ]
    }

    update () {

    }

    repaint () {
        this.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawEllipse(0, 0, this.width, this.height);
    }

}
