import { ConnectionHandle } from "./ConnectionHandle";
import { RelativeOrientation } from "../orientations/RelativeOrientation";

export class RelativeConnectionHandle extends ConnectionHandle {

    constructor (owner, dx, dy) {
        super(owner, new RelativeOrientation(owner, dx, dy));
    }

}
