import { Line } from "../connections/Line";

export class Connection extends Line {

    constructor (src, dest) {
        super(src, dest);
        this.figures = [];
    }

    connect (figure) {
        this.figures.push(figure);
        figure.connections.push(this);
    }

    redraw () {
        if (this.figures.length > 0) {
            for (let i=0; i<this.figures.length; i++) {
                this.setPointAt(i, this.figures[i].position());
            }
        }
        super.redraw();
    }


}
