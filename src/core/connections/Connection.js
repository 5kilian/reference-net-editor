import { Line } from '../figures/Line';
import { Geometry2d } from '../util/Geometry2d';


export class Connection extends Line {

    constructor (src, dest) {
        super(src, dest);
        this.from = [];
        this.to = [];

        this.mode = Connection.STRAIGHT;

        this.line = new createjs.Point();
        this.previous = new createjs.Point();
        this.edges = [];
        this.helper = [
            new createjs.Point(),
            new createjs.Point(),
            new createjs.Point(),
            new createjs.Point(),
        ];

        this.connectSrc(src.connector);
    }

    connectSrc (connector) {
        if (connector) {
            this.from.push(connector.owner);
            connector.owner.addConnection(this);
        }
    }

    connectDest (connector) {
        if (connector) {
            this.to.push(connector.owner);
            connector.owner.addConnection(this);
        }
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
        switch (this.mode) {
            case Connection.STRAIGHT:
                super.redraw();
                break;
            case Connection.CENTER:
                if (src.connector) {
                    src.copy(src.connector.owner.center());
                }
                if (dest.connector) {
                    dest.copy(dest.connector.owner.center());
                }
                if (src.connector) {
                    let collideAt = this.checkLineCollision(
                        src.connector.owner,
                        dest,
                        src,
                    );
                    this.graphics.moveTo(collideAt.x, collideAt.y);
                } else {
                    this.graphics.moveTo(src.x, src.y);
                }
                if (dest.connector) {
                    let collideAt = this.checkLineCollision(
                        dest.connector.owner,
                        src,
                        dest,
                    );
                    this.graphics.lineTo(collideAt.x, collideAt.y);
                } else {
                    this.graphics.lineTo(dest.x, dest.y);
                }
                break;
            case Connection.ANGULAR:
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
                break;
            case Connection.CIRCULAR:
                super.redraw();
                break;
        }
    }

    checkLineCollision (object, start, end) {
        this.line.copy(start);
        this.previous.copy(this.line);

        let colliding = (object, start, end) => {
            return object.hitTestGlobal(start.x, start.y)
            || (start.x === end.x && start.y === end.y)
        };

        while (!colliding(object, this.line, end)) {
            Geometry2d.center(this.previous.copy(this.line), end, this.line);
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
