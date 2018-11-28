
export class Geometry2d {

    static dot (p1, p2) {
        return p1.x * p2.x + p1.y * p2.y;
    }

    static cross (p1, p2) {
        return p1.x * p2.y - p1.y * p2.x;
    }

    static normalize (p) {

    }

    static distance (p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.y - p2.y));
    }

    static center (p1, p2, pt) {
        return (pt || new createjs.Point()).setValues(
            (p1.x + p2.x) / 2,
            (p1.y + p2.y) / 2
        );
    }

    static intersect (p1, p2, p3, p4) {
        return this.intersectAt(
            p1.x, p1.y,
            p2.x, p2.y,
            p3.x, p3.y,
            p4.x, p4.y
        );
    }

    static intersectAt (x1, y1, x2, y2, x3, y3, x4, y4) {
        let Ax = (x1 - x2), Ay = (y2 - y1);
        let Bx = (x3 - x4), By = (y4 - y3);

        let delta = (Ay * Bx - By * Ax);
        if (delta === 0) {
            return null;
        }

        let CA = Ax * y1 + Ay * x1;
        let CB = Bx * y3 + By * x3;

        let invertedDelta = 1 / delta;
        return new createjs.Point(
            (Bx * CA - Ax * CB) * invertedDelta,
            (Ay * CB - By * CA) * invertedDelta
        );
    }

}
