import { Line } from '../figures/Line';


export class Connection extends Line {

    constructor (src, dest) {
        super(src, dest);
        this.edgehelper = [];

        this.mode = Connection.CENTER;

        this.line = new createjs.Point();
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
                    let collideAt = this.checkCollision(
                        src.connector.owner,
                        dest,
                        src.connector.owner.center(),
                    );
                    this.graphics.moveTo(collideAt.x, collideAt.y);
                } else {
                    this.graphics.moveTo(src.x, src.y);
                }
                if (dest.connector) {
                    let collideAt = this.checkCollision(
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
                super.redraw();
                break;
            case Connection.CIRCULAR:
                super.redraw();
                break;
        }
    }

    checkCollision (object, start, end) {
        this.line.copy(start);

        let dx = Math.abs(end.x - start.x), sx = start.x < end.x ? 1 : -1;
        let dy = Math.abs(end.y - start.y), sy = start.y < end.y ? 1 : -1;
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
