import { LinePointHandle } from '../handles/line/LinePointHandle';
import { Figure } from './Figure';


export class Line extends Figure {

    constructor (src, dest) {
        super(0, 0);
        this.type = 'line';
        this.points = [ ];
        this.handles = [ ];

        this.insertPoint(src);
        this.insertPoint(dest);
    }

    update () { }

    move (dx, dy) {
        this.points.forEach(point => {
            point.setValues(point.x + dx, point.y + dy);
        });
        this.onMove();
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

    setSrc (point) {
        this.setPointAt(0, point)
    }

    setDest (point) {
        this.setPointAt(this.points.length-1, point);
    }

    setPointAt (index, point) {
        this.pointAt(index).setValues(point.x, point.y);
        this.pointAt(index).connector = point.connector;
        this.onMove();
    }

    insertPoint (point) {
        this.insertPointAt(this.points.size, point);
    }

    insertPointAt (index, pointAt) {
        let point = pointAt.clone();
        point.handle = new LinePointHandle(this, point);
        point.connector = pointAt.connector;
        this.points.splice(index, 0, point);
        this.handles = this.points.map(point => point.handle);
        this.onMove();
    }

    removePointAt (index) {
        this.points.splice(index, 1);
        this.handles = this.points.map(point => point.handle);
        this.onMove();
    }

    containsPoint (point) {
        return this.containsPointAt(point.x, point.y);
    }

    containsPointAt (x, y) {
        for (let point in this.points) {
            if (point.x === x && point.y === y) {
                return true;
            }
        }
        return false;
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
        return this.boundingBox.setValues(
            min.x,
            min.y,
            max.x - min.x,
            max.y - min.y
        );
    }

    redraw () {
        let src = this.src();
        this.graphics.clear().s(this.lineColor).moveTo(src.x, src.y);
        for (let i=1; i<this.points.length; i++) {
            this.graphics.lineTo(this.points[i].x, this.points[i].y);
        }
        this.rect();
    }

    adjustScale (dx, dy) {
        this.onMove();
    }

    stretch (east, south, west, north) {
        this.onMove();
    }

}
