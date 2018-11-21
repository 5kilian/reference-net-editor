import { ConnectionHandle } from "./ConnectionHandle";
import { RadialOrientation } from "../orientations/RadialOrientation";

export class RadialConnectionHandle extends ConnectionHandle {

    constructor (owner, degree) {
        super(owner, new RadialOrientation(owner, degree));
    }

}
