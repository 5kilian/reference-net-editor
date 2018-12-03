import { Geometry } from '../util/Geometry';
import { Connection } from './Connection';
import { Point } from '../util/Point';


export class CollisionConnection extends Connection {

    constructor (x, y) {
        super(x, y);
    }

    position (src, dest, output) {
        output = output || new Point();
        if (dest.connector) {
            let figure = dest.connector.owner;
            let start = this.localToGlobal(src.x, src.y);
            let end = this.localToGlobal(dest.x, dest.y);

            start.copy(Geometry.intersectRect(start, end, figure.rect()));

            let collideAt = Geometry.intersectBresenham(start, end, figure);
            if (collideAt) {
                return output.copy(this.globalToLocal(collideAt.x, collideAt.y));
            }
        }
        return output.copy(dest);
    }

}
