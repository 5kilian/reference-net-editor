import { ConnectionHandle } from "./ConnectionHandle";
import { CardinalOrientation } from "../orientations/CardinalOrientation";

export class CardinalConnectionHandle extends ConnectionHandle {

    constructor (owner, direction) {
        super(owner, new CardinalOrientation(owner, direction));
    }

}
