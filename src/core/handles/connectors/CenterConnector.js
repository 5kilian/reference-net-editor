import { CenterOrientation } from '../../orientations/CenterOrientation';
import { Connector } from "./Connector";

export class CenterConnector extends Connector {

    constructor (owner) {
        super(owner, new CenterOrientation(owner));
    }

}
