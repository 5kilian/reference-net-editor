import { Line } from "../connections/Line";

export class Connection extends Line {

    constructor (src, dest) {
        super(src, dest);
        this.figures = [];
        this.helper = new createjs.Point(src.x, src.y);
        this.insertPointAt(1, this.helper);
    }

    connect (figure) {
        this.figures.push(figure);
        figure.connections.push(this);
    }

}
