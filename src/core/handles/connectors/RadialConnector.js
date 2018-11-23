import { Connector } from "./Connector";
import { RadialOrientation } from "../../orientations/RadialOrientation";

export class RadialConnector extends Connector {

    constructor (owner, degree) {
        super(owner, new RadialOrientation(owner, degree));
    }

}
