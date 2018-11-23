import { Connector } from "./Connector";
import { CardinalOrientation } from "../../orientations/CardinalOrientation";

export class CardinalConnector extends Connector {

    constructor (owner, direction) {
        super(owner, new CardinalOrientation(owner, direction));
    }

}
