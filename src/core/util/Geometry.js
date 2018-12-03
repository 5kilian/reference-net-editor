import { Point } from './Point';


export class Geometry {

    static dot (p1, p2) {
        return p1.x * p2.x + p1.y * p2.y;
    }

    static cross (p1, p2) {
        return p1.x * p2.y - p1.y * p2.x;
    }

    static normalize (p) {
        // TODO
    }

    static distance (p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow((p1.y - p2.y), 2));
    }

    static center (p1, p2, pt) {
        return (pt || new Point()).setValues(
            (p1.x + p2.x) / 2,
            (p1.y + p2.y) / 2
        );
    }

    static corners (rect) {
        return {
            NORTHWEST: new Point(rect.x, rect.y),
            NORTHEAST: new Point(rect.x + rect.width, rect.y),
            SOUTHWEST: new Point(rect.x, rect.y + rect.height),
            SOUTHEAST: new Point(rect.x + rect.width, rect.y + rect.height),
        };
    }

    static intersect (p1, p2, p3, p4) {
        return this.intersectAt(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
    }

    static intersectAt (x1, y1, x2, y2, x3, y3, x4, y4) {
        let Ax = x1 - x2, Ay = y2 - y1;
        let Bx = x3 - x4, By = y4 - y3;

        let delta = Ay * Bx - By * Ax;
        if (delta === 0) {
            return null;
        }

        let CA = Ax * y1 + Ay * x1;
        let CB = Bx * y3 + By * x3;

        let invertedDelta = 1 / delta;
        return new Point(
            (Bx * CA - Ax * CB) * invertedDelta,
            (Ay * CB - By * CA) * invertedDelta
        );
    }

    /**
     *
     * @param p1 src
     * @param p2 dest
     * @param r rect
     * @returns Point
     */
    static intersectRect (p1, p2, r) {
        let c = Geometry.corners(r);
        let p = p1.clone();

        if (p1.x < c.NORTHWEST.x) {
            if (p1.y < c.NORTHWEST.y) {
                p.copy(Geometry.intersect(p1, p2, c.NORTHWEST, c.SOUTHWEST));
                if (!r.contains(p1.x, p1.y)) {
                    p.copy(Geometry.intersect(p1, p2, c.NORTHEAST, c.NORTHWEST));
                }
            } else if (p1.y > c.SOUTHWEST.y) {
                p.copy(Geometry.intersect(p1, p2, c.NORTHWEST, c.SOUTHWEST));
                if (!r.contains(p1.x, p1.y)) {
                    p.copy(Geometry.intersect(p1, p2, c.SOUTHEAST, c.SOUTHWEST));
                }
            } else {
                p.copy(Geometry.intersect(p1, p2, c.NORTHWEST, c.SOUTHWEST));
            }
        } else if (p1.x > c.NORTHEAST.x) {
            if (p1.y < c.NORTHEAST.y) {
                p.copy(Geometry.intersect(p1, p2, c.NORTHEAST, c.SOUTHEAST));
                if (!r.contains(p1.x, p1.y)) {
                    p.copy(Geometry.intersect(p1, p2, c.NORTHEAST, c.NORTHWEST));
                }
            } else if (p1.y > c.SOUTHEAST.y) {
                p.copy(Geometry.intersect(p1, p2, c.NORTHEAST, c.SOUTHEAST));
                if (!r.contains(p1.x, p1.y)) {
                    p.copy(Geometry.intersect(p1, p2, c.SOUTHEAST, c.SOUTHWEST));
                }
            } else {
                p.copy(Geometry.intersect(p1, p2, c.NORTHEAST, c.SOUTHEAST));
            }
        } else if (p1.y < c.NORTHWEST.y) {
            p.copy(Geometry.intersect(p1, p2, c.NORTHEAST, c.NORTHWEST));
        } else if (p1.y > c.SOUTHEAST.y) {
            p.copy(Geometry.intersect(p1, p2, c.SOUTHEAST, c.SOUTHWEST));
        }

        return p;
    }

    /**
     *
     * @param start
     * @param end
     * @param object
     * @returns Point|boolean
     */
    static intersectBresenham (start, end, object) {
        let line = new Point(start.x, start.y);

        let reachedEnd = (start, end) => (
            start.x >= end.x-2 && start.x <= end.x+2
            && start.y >= end.y-2 && start.y <= end.y+2
        );

        let dx = Math.abs(end.x - line.x), sx = line.x < end.x ? 1 : -1;
        let dy = Math.abs(end.y - line.y), sy = line.y < end.y ? 1 : -1;
        let err = (dx > dy ? dx : -dy) / 2, e2;

        while (!reachedEnd(line, end)) {
            if (object.hitTestGlobal(line.x, line.y)) {
                return line.translate(2 * sx, 2 * sy);
            }
            e2 = err;
            if (e2 > -dx) {
                err -= dy;
                line.x += sx;
            }
            if (e2 < dy) {
                err += dx;
                line.y += sy;
            }
        }

        return false;
    }

}
