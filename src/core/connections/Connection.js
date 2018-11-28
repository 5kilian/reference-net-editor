import { Line } from '../figures/Line';
import { Geometry2d } from '../util/Geometry2d';


export class Connection extends Line {

    constructor (src, dest) {
        super(src, dest);
        this.edgehelper = [];

        this.mode = Connection.CENTER;

        this.line = new createjs.Point();
        this.preious = new createjs.Point();
        this.helper = [
            new createjs.Point(),
            new createjs.Point(),
            new createjs.Point(),
            new createjs.Point(),
        ];
    }

    connect () {

    }

    disconnect () {

    }

    redraw () {
        let src = this.src();
        let dest = this.dest();

        this.graphics.clear().s(this.lineColor);
        switch (this.mode) {
            case Connection.STRAIGHT:
                this.graphics.moveTo(src.x, src.y).lineTo(dest.x, dest.y);
                break;
            case Connection.CENTER:
                if (src.connector) {
                    let collideAt = this.checkLineCollision(
                        src.connector.owner,
                        dest,
                        src.connector.owner.center(),
                    );
                    this.graphics.moveTo(collideAt.x, collideAt.y);
                } else {
                    this.graphics.moveTo(src.x, src.y);
                }
                if (dest.connector) {
                    let collideAt = this.checkLineCollision(
                        dest.connector.owner,
                        src,
                        dest.connector.owner.center(),
                    );
                    this.graphics.lineTo(collideAt.x, collideAt.y);
                } else {
                    this.graphics.lineTo(dest.x, dest.y);
                }
                break;
            case Connection.ANGULAR:
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
                } else if (Math.abs(dest.x - src.x) > 30)
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
        this.preious.copy(this.line);

        while (!object.hitTestGlobal(this.line.x, this.line.y)
            && this.line.x !== end.x && this.line.y !== end.y) {
            this.preious.copy(this.line);
            Geometry2d.center(this.line, end, this.line);
        }
        this.line.copy(this.preious);

        let dx = Math.abs(end.x - this.line.x), sx = this.line.x < end.x ? 1 : -1;
        let dy = Math.abs(end.y - this.line.y), sy = this.line.y < end.y ? 1 : -1;
        let err = (dx > dy ? dx : -dy) / 2, e2;

        while (true) {
            if (object.hitTestGlobal(this.line.x, this.line.y)) break;
            if (this.line.x === end.x && this.line.y === end.y) break;
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
