import ConnectionHandle from "./ConnectionHandle";
import RelativeOrientation from "../orientations/RelativeOrientation";

export default class RelativeConnectionHandle extends ConnectionHandle {

    constructor (owner, dx, dy) {
        super(owner, new RelativeOrientation(dx, dy));
    }

}
