import { Line } from "../figures/Line";

export class Connection extends Line {

    constructor (src, dest) {
        super(src, dest);
        this.figures = [];

        this.mode = Connection.STRAIGHT;

        this.northEast = new createjs.Point(src.x, src.y);
        this.northWest = new createjs.Point(src.x, src.y);
        this.southEast = new createjs.Point(src.x, src.y);
        this.southWest = new createjs.Point(src.x, src.y);
    }

    connect (figure) {
        this.figures.push(figure);
        figure.connections.push(this);
    }

    redraw () {
        switch (this.mode) {
            case Connection.STRAIGHT:
                this.graphics.clear().s(this.lineColor)
                    .moveTo(this.src.x, this.src.y)
                    .lineTo(this.dest.x, this.dest.y);
                break;
            case Connection.ANGULAR:
                let line = this.graphics.clear().s(this.lineColor)
                    .moveTo(this.src.x, this.src.y)
                    .lineTo(this.dest.x, this.dest.y);
                break;
            case Connection.CIRCULAR:
                break;
        }
    }

    static get STRAIGHT () {
        return 0;
    }

    static get ANGULAR () {
        return 1;
    }

    static get CIRCULAR () {
        return 2;
    }

}
