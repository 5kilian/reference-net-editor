import DrawingObject from '../DrawingObject';
import Canvas from "../Canvas";

export default class Connection extends DrawingObject {

    constructor (src, dest) {
        super();
        this.type = 'connection';
        this.points = [];
        this.bind(src, dest);
        Canvas().bottom(this.shape);
    }

    draw () {
        this.shape.graphics.clear().beginStroke('red');
        this.shape.graphics.moveTo(this.src.x + this.src.width / 2, this.src.y + this.src.height / 2);
        this.points.forEach((point) => this.shape.graphics.lineTo(point.x, point.y));
        this.shape.graphics.lineTo(this.dest.x + this.src.width / 2, this.dest.y + this.dest.height / 2);
        // this.shape.graphics.();
    }

    bind (src, dest) {
        this.src = src;
        this.dest = dest;
        src.connections.push(this);
        dest.connections.push(this);
    }

    remove () {
        this.src.connections.splice(this.src.connections.indexOf(this), 1);
        this.dest.connections.splice(this.dest.connections.indexOf(this), 1);
        Canvas().remove(this);
    }

}
