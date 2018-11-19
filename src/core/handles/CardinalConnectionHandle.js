import ConnectionHandle from "./ConnectionHandle";
import CardinalOrientation from "../orientations/CardinalOrientation";

export default class CardinalConnectionHandle extends ConnectionHandle {

    constructor (owner, direction) {
        super(owner, new CardinalOrientation(owner, direction));
    }

}
