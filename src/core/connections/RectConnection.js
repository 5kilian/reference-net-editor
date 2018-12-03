import { Geometry } from '../util/Geometry';
import { Connection } from './Connection';


export class RectConnection extends Connection {

    constructor (x, y) {
        super(x, y);
    }

    position (src, dest, output) {
        if (dest.connector) {
            let figure = dest.connector.owner;
            let start = this.localToGlobal(src.x, src.y);
            let end = this.localToGlobal(dest.x, dest.y);

            return this.toLocal(Geometry.intersectRect(start, end, figure.rect()));
        }
        return dest;
    }

}
