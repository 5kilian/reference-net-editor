import { Geometry } from '../util/Geometry';
import { Connection } from './Connection';
import { Point } from '../util/Point';


export class CollisionConnection extends Connection {

    constructor (x, y) {
        super(x, y);
    }

    position (src, dest, output) {
        if (dest.connector) {
            let figure = dest.connector.owner;
            let rect = figure.rect();
            let corners = figure.corners();
            let srcGlobal = this.localToGlobal(src.x, src.y);
            let destGlobal = this.localToGlobal(dest.x, dest.y);

            if (srcGlobal.x < corners.NORTHWEST.x) {
                if (srcGlobal.y < corners.NORTHWEST.y) {
                    srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.NORTHWEST, corners.SOUTHWEST));
                    if (!rect.contains(srcGlobal.x, srcGlobal.y)) {
                        srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.NORTHEAST, corners.NORTHWEST));
                    }
                } else if (srcGlobal.y > corners.SOUTHWEST.y) {
                    srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.NORTHWEST, corners.SOUTHWEST));
                    if (!rect.contains(srcGlobal.x, srcGlobal.y)) {
                        srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.SOUTHEAST, corners.SOUTHWEST));
                    }
                } else {
                    srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.NORTHWEST, corners.SOUTHWEST));
                }
            } else if (srcGlobal.x > corners.NORTHEAST.x) {
                if (srcGlobal.y < corners.NORTHEAST.y) {
                    srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.NORTHEAST, corners.SOUTHEAST));
                    if (!rect.contains(srcGlobal.x, srcGlobal.y)) {
                        srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.NORTHEAST, corners.NORTHWEST));
                    }
                } else if (srcGlobal.y > corners.SOUTHEAST.y) {
                    srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.NORTHEAST, corners.SOUTHEAST));
                    if (!rect.contains(srcGlobal.x, srcGlobal.y)) {
                        srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.SOUTHEAST, corners.SOUTHWEST));
                    }
                } else {
                    srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.NORTHEAST, corners.SOUTHEAST));
                }
            } else if (srcGlobal.y < corners.NORTHWEST.y) {
                srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.NORTHEAST, corners.NORTHWEST));
            } else if (srcGlobal.y > corners.SOUTHEAST.y) {
                srcGlobal.copy(Geometry.intersect(srcGlobal, destGlobal, corners.SOUTHEAST, corners.SOUTHWEST));
            }

            let collideAt = Geometry.bresenhamCollision(
                srcGlobal,
                destGlobal,
                figure
            );
            if (collideAt) {
                return (output || new Point()).copy(this.globalToLocal(collideAt.x, collideAt.y));
            }
        }
        return (new Point()).copy(dest);
    }

}
