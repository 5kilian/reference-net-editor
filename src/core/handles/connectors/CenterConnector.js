import { CenterOrientation } from '../../orientations/CenterOrientation';
import { Connector } from "./Connector";

export class CenterConnector extends Connector {

    constructor (owner) {
        super(owner, new CenterOrientation(owner));
        this.hitArea = new createjs.Shape(new createjs.Graphics().clear().f('#000').drawRect(-3, -3, 6, 6));
    }

}
