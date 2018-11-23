import { Connector } from "./Connector";
import { RelativeOrientation } from "../../orientations/RelativeOrientation";

export class RelativeConnector extends Connector {

    constructor (owner, dx, dy) {
        super(owner, new RelativeOrientation(owner, dx, dy));
    }

}
