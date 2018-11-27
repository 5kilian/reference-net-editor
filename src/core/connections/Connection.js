import { Line } from '../figures/Line';

export class Connection extends Line {

    constructor (src, dest) {
        super(src, dest);
        this.edgehelper = [];

        this.mode = Connection.CENTER;

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
                    let collideAt = this.checkCollision(src.connector.owner, dest);
                    this.graphics.moveTo(collideAt.x, collideAt.y);
                } else {
                    this.graphics.moveTo(src.x, src.y);
                }
                if (dest.connector) {
                    this.graphics.lineTo(dest.x, dest.y);
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

    checkCollision (object, dest) {
        const center = object.center();
        const corners = object.corners();

        if (Math.abs(dest.y - center.y) < Math.abs(dest.x - center.x)) {
            return this.checkCollisionLow(object, dest);
        } else {
            return this.checkCollisionHigh(object, dest);
        }
    }

    checkCollisionLow (object, end) {
        let center = object.center();
        let dx = end.x - center.x;
        let dy = end.y - center.y;
        let yi = 1;
        if (dy < 0) {
            yi = -1;
            dy = -dy;
        }
        let D = 2 * dy - dx;
        let y = center.y;

        let prevX = center.x, prevY = y;
        for (let x = center.x; x < end.x; prevX = x++) {
            let objectLocal = object.globalToLocal(x, y);
            if (!object.hitTest(objectLocal.x, objectLocal.y)) {
                return new createjs.Point(prevX, prevY);
            }
            if (D > 0) {
                prevY = y;
                y += yi;
                D = D - 2*dx;
            }
            D = D + 2*dy
        }

        return center;
    }

    checkCollisionHigh (object, end) {
        let center = object.center();
        let dx = end.x - center.x;
        let dy = end.y - center.y;
        let xi = 1;
        if (dx < 0) {
            xi = -1;
            dx = -dx;
        }
        let D = 2 * dx - dy;
        let x = center.x;

        let prevX = x, prevY = center.y;
        for (let y = center.y; y < end.y; prevY = y++) {
            let objectLocal = object.globalToLocal(x, y);
            if (!object.hitTest(objectLocal.x, objectLocal.y)) {
                return new createjs.Point(prevX, prevY);
            }
            if (D > 0) {
                prevX = x;
                x += xi;
                D = D - 2*dy;
            }
            D = D + 2*dx
        }

        return center;
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
