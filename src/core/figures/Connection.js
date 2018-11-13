import Line from "./Line";

export default class Connection extends Line {

    constructor (src, dest) {
        super(src, dest);
        this.figures = [];
    }

    connect (figure) {
        this.figures.push(figure);
        figure.connections.push(this);
    }

    repaint () {
        if (this.figures.length > 0) {
            for (let i=0; i<this.figures.length; i++) {
                this.setPointAt(i, this.figures[i].pos());
            }
        } 
        super.repaint();
        /*
        if (this.figures.length > 0) {
            let src = this.figures[0].pos();
            this.graphics.clear().s(this.lineColor).moveTo(src.x, src.y);
            for (let i=1; i<this.figures.length; i++) {
                this.dest = this.figures[i].pos();
                this.graphics.lineTo(this.dest.x, this.dest.y);
            }
        } else {
            super.repaint();
        }
        */
    }

}