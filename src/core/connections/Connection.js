import { Line } from '../figures/Line';
import { Geometry } from '../util/Geometry';
import { Point } from '../util/Point';


export class Connection extends Line {

    constructor (x, y) {
        super(x, y);
        this.from = [];
        this.to = [];

        this.mode = Connection.CENTER;

        this.line = new Point();
        this.previous = new Point();
        this.helper = [ new Point(), new Point(), new Point(), new Point(), ];
        this.edges = [];
    }

    connectSrc (figure) {
        this.from.push(figure);
        figure.addConnection(this);
    }

    connectDest (figure) {
        this.to.push(figure);
        figure.addConnection(this);
    }

    disconnect (figure) {
        figure.removeConnection(this);
    }

    /**
     * @abstract
     */
    position (src, dest, output) { }

    updatePositions () {
        this.points.forEach(point => {
            if (point.connector) {
                this.globalToLocal(point.connector.x, point.connector.y, point);
            }
        });

        if (this.points.length > 1) {
            let points = [];
            points.push(this.position(this.pointAt(1), this.pointAt(0)));
            for (let i=1; i<this.points.length; i++) {
                points.push(this.position(this.pointAt(i-1), this.pointAt(i)));
            }

            for (let i=0; i<points.length; i++) {
                this.pointAt(i).copy(points[i]);
                delete points[i];
            }
        }

        this.updateWidthHeight();
    }

    redraw () {
        super.redraw();
    }

    redrawStraight () {
        let src = this.src();
        let dest = this.dest();
        if (src.connector) {
            this.globalToLocal(src.connector.x, src.connector.y, src);
        }
        if (dest.connector) {
            this.globalToLocal(src.connector.x, src.connector.y, src);
        }
        this.graphics.moveTo(src.x, src.y);
        for (let i=1; i<this.points.length; i++) {
            this.graphics.lineTo(this.points[i].x, this.points[i].y);
        }
    }

    redrawCenter () {
        let src = this.src();
        let dest = this.dest();
        if (src.connector) {
            let center = src.connector.owner.center();
            this.globalToLocal(center.x, center.y, src);
            src.copy(this.checkLineCollision(src.connector.owner, dest, src));
            let sx = src.x < 0 ? 1 : 0;
            let sy = src.y < 0 ? 1 : 0;
            this.x += sx * src.x;
            this.y += sy * src.y;
            this.points.forEach(point => point.setValues(
                point.x - sx * src.x,
                point.y - sy * src.y)
            );
            this.updateWidthHeight();
        }
        if (dest.connector) {
            let center = dest.connector.owner.center();
            this.globalToLocal(center.x, center.y, dest);
            dest.copy(this.checkLineCollision(dest.connector.owner, src, dest));
            let sx = dest.x < 0 ? 1 : 0;
            let sy = dest.y < 0 ? 1 : 0;
            this.x += sx * dest.x;
            this.y += sy * dest.y;
            this.points.forEach(point => point.setValues(
                point.x - sx * dest.x,
                point.y - sy * dest.y)
            );
            this.updateWidthHeight();
        }
        this.graphics.moveTo(src.x, src.y);
        this.graphics.lineTo(dest.x, dest.y);
    }

    redrawAngular (src, dest) {
        this.edges = [];

        this.graphics.moveTo(src.x, src.y);
        if (src.y === dest.y && Math.abs(dest.x - src.x) > 30) {
            this.edges.push(
                this.helper[0].setValues(src.x, src.y + 10)
            );
            this.edges.push(
                this.helper[1].setValues(dest.x, dest.y + 10)
            );
        } else if (src.x === dest.x && Math.abs(dest.y - src.y) > 30) {
            this.edges.push(
                this.helper[0].setValues(src.x + 10, src.y)
            );
            this.edges.push(
                this.helper[1].setValues(dest.x + 10, dest.y)
            );
        } else if (src.x !== dest.x && Math.abs(dest.y - src.y) > 30) {
            this.edges.push(this.helper[0].setValues(src.x, dest.y));
        } else {
            this.edges.push(this.helper[0].setValues(dest.x, src.y));
        }
        this.edges.forEach(edge => {
            this.graphics.lineTo(edge.x, edge.y);
        });
        this.graphics.lineTo(dest.x, dest.y);
    }

    redrawCircular () {

    }

    // TODO: static export to Geometry
    checkLineCollision (object, start, end) {
        this.line.copy(start);
        this.previous.copy(this.line);

        let colliding = (object, start, end) => {
            let point = this.localToLocal(start.x, start.y, object);
            return (object.hitTest(point.x, point.y))
                || (start.x >= end.x-2 && start.x <= end.x+2
                    && start.y >= end.y-2 && start.y <= end.y+2)
        };

        // TODO: better convergence approach / start at bounding box intersection
        while (!colliding(object, this.line, end)) {
            Geometry.center(this.previous.copy(this.line), end, this.line);
        }
        this.line.copy(this.previous);

        let dx = Math.abs(end.x - this.line.x), sx = this.line.x < end.x ? 1 : -1;
        let dy = Math.abs(end.y - this.line.y), sy = this.line.y < end.y ? 1 : -1;
        let err = (dx > dy ? dx : -dy) / 2, e2;

        while (!colliding(object, this.line, end)) {
            e2 = err;
            if (e2 > -dx) {
                err -= dy;
                this.line.x += sx;
            }
            if (e2 < dy) {
                err += dx;
                this.line.y += sy;
            }
        }

        return this.line;
    }

    static get STRAIGHT () {
        return 0;
    }

    static get CENTER () {
        return 1;
    }

    static get ANGULAR () {
        return 2;
    }

    static get CIRCULAR () {
        return 3;
    }

}
