import Figure from "../figures/Figure";
import LinePointHandle from '../handles/LinePointHandle';

class LinePoint {

    constructor (owner, point) {
        this.handle = new LinePointHandle(owner, this);
        this.setPosition(point.x, point.y);
    }

    move (dx, dy) {
        this.setPosition(this.x + dx, this.y + dy);
    }

    setPosition (x, y) {
        this.x = x;
        this.y = y;
        this.handle.updatePosition();
    }

}

export default class Line extends Figure {

    constructor (src, dest) {
        super(0, 0);
        this.type = 'line';
        this.points = [ new LinePoint(this, src), new LinePoint(this, dest) ];
        this.handles = this.points.map(point => point.handle);
    }

    update () {

    }

    pos () {
        return this.src();
    }

    move (dx, dy) {
        this.points.forEach(point => point.move(dx, dy));
        this.repaint();
        this.updateHandles();
    }

    src () {
        return this.pointAt(0);
    }

    dest () {
        return this.pointAt(this.points.length-1);
    }

    pointAt (index) {
        return this.points[index];
    }

    setDest (point) {
        this.setPointAt(this.points.length-1, point)
    }

    setPointAt (index, point) {
        this.pointAt(index).setPosition(point.x, point.y);
    }

    insertPointAt (index, point) {
        this.points.splice(index, 0, new LinePoint(this, point));
    }

    removePointAt (index) {
        this.points.splice(index, 1);
    }

    rect () {
        let min = { x: this.src().x, y: this.src().y };
        let max = { x: 0, y: 0 };
        this.points.forEach(point => {
            if (point.x < min.x) min.x = point.x;
            if (point.y < min.y) min.y = point.y;
            if (point.x > max.x) max.x = point.x;
            if (point.y > max.y) max.y = point.y;
        });
        return new createjs.Rectangle(min.x, min.y, max.x - min.x, max.y - min.y);
    }

    repaint () {
        let src = this.src();
        this.graphics.clear().s(this.lineColor).moveTo(src.x, src.y);
        for (let i=1; i<this.points.length; i++) {
            this.graphics.lineTo(this.points[i].x, this.points[i].y);
        }
    }

}
