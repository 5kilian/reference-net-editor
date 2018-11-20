import ConnectionHandle from "./ConnectionHandle";
import RadialOrientation from "../orientations/RadialOrientation";

export default class RadialConnectionHandle extends ConnectionHandle {

    constructor (owner, degree) {
        super(owner, new RadialOrientation(owner, degree));
    }

}
