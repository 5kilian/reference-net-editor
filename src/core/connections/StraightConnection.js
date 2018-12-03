import { Connection } from './Connection';
import { Point } from '../util/Point';


export class StraightConnection extends Connection {

    constructor (x, y) {
        super(x, y);
    }

    position (src, dest, output) {
        return (output || new Point()).copy(dest);
    }

}
