import { CenterOrientation } from '../orientations/CenterOrientation';
import { ConnectionHandle } from "./ConnectionHandle";

export class CenterConnectionHandle extends ConnectionHandle {

    constructor (owner) {
        super(owner, new CenterOrientation(owner));
    }

}
