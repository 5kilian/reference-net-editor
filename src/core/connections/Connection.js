import { Line } from '../figures/Line';
import { Geometry } from '../util/Geometry';
import { Point } from '../util/Point';


export class Connection extends Line {

    constructor (x, y) {
        super(x, y);
        this.from = [];
        this.to = [];

        this.mode = Connection.CENTER;
        this.strokes = false;

        this.line = new Point();
        this.previous = new Point();
        this.helper = [ new Point(), new Point(), new Point(), new Point(), ];
        this.edges = [];

        this.connectSrc(src.connector);
    }

    connectSrc (connector) {
        this.src().connector = connector;
        this.from.push(connector.owner);
        connector.owner.addConnection(this);
    }

    connectDest (connector) {
        this.dest().connector = connector;
        this.to.push(connector.owner);
        connector.owner.addConnection(this);
    }

    disconnect (connector) {
        if (connector) {
            connector.owner.removeConnection(this);
        }
    }

    redraw () {
        let src = this.src();
        let dest = this.dest();
        if (src.connector) {
            src.copy(src.connector);
        }
        if (dest.connector) {
            dest.copy(dest.connector);
        }

        this.graphics.clear().s(this.lineColor);
        if (this.strokes) {
            this.graphics.setStrokeDash([5, 5], 0);
        }
        switch (this.mode) {
            case Connection.STRAIGHT:
                super.redraw();
                break;
            case Connection.CENTER:
                if (src.connector) {
                    src.copy(src.connector.owner.center());
                    let collideAt = this.checkLineCollision(
                        src.connector.owner,
                        dest,
                        src,
                    );
                    src.setValues(collideAt.x, collideAt.y);
                }
                this.graphics.moveTo(0, 0);
                if (dest.connector) {
                    dest.copy(dest.connector.owner.center());
                    let collideAt = this.checkLineCollision(
                        dest.connector.owner,
                        src,
                        dest,
                    );
                    dest.setValues(collideAt.x, collideAt.y);

                }
                this.graphics.lineTo(dest.x, dest.y);
                break;
            case Connection.ANGULAR:
                this.redrawAngular(src, dest);
                break;
            case Connection.CIRCULAR:
                super.redraw();
                break;
        }
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

    // TODO: static export to Geometry
    checkLineCollision (object, start, end) {
        this.line.copy(start);
        this.previous.copy(this.line);

        let colliding = (object, start, end) => {
            // TODO: localToLocal hitTest
            return (object.hitTestGlobal(start.x, start.y) && object.rect().contains(start.x, start.y))
            || (start.x >= end.x-2 && start.x <= end.x+2 && start.y >= end.y-2 && start.y <= end.y+2)
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
