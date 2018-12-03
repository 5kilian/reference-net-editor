import { LinePointHandle } from '../handles/line/LinePointHandle';
import { Figure } from './Figure';
import { Point } from '../util/Point';


export class Line extends Figure {

    constructor (x, y) {
        super(x, y);
        this.points = [ ];
        this.handles = [ ];
        this.strokes = false;

        this.insertPoint(new Point());
        this.insertPoint(new Point());
    }

    update () { }

    src () {
        return this.pointAt(0);
    }

    dest () {
        return this.pointAt(this.points.length-1);
    }

    pointAt (index) {
        return this.points[index] || null;
    }

    setSrc (x, y) {
        this.setPointAt(0, x, y)
    }

    setDest (x, y) {
        this.setPointAt(this.points.length-1, x, y);
    }

    setPointAt (index, x, y) {
        this.globalToLocal(x, y, this.localPoint);
        this.pointAt(index).setValues(this.localPoint.x, this.localPoint.y);
        let sx = this.localPoint.x < 0 ? 1 : 0;
        let sy = this.localPoint.y < 0 ? 1 : 0;
        this.x += sx * this.localPoint.x;
        this.y += sy * this.localPoint.y;
        this.points.forEach(point => point.setValues(
            point.x - sx * this.localPoint.x,
            point.y - sy * this.localPoint.y)
        );
        this.updateWidthHeight();
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
        this.globalToLocal(point.x, point.y, this.localPoint);
        return this.containsPointAt(this.localPoint.x, this.localPoint.y);
    }

    containsPointAt (x, y) {
        for (let point in this.points) {
            if (point.x === x && point.y === y) {
                return true;
            }
        }
        return false;
    }

    updateWidthHeight () {
        let min = { x: this.src().x, y: this.src().y };
        let max = { x: 0, y: 0 };
        this.points.forEach(point => {
            if (point.x < min.x) min.x = point.x;
            if (point.y < min.y) min.y = point.y;
            if (point.x > max.x) max.x = point.x;
            if (point.y > max.y) max.y = point.y;
        });
        this.width = max.x - min.x;
        this.height = max.y - min.y;
    }

    redraw () {
        let src = this.src();

        if (this.strokes) {
            this.graphics.setStrokeDash([5, 5], 0);
        }

        this.graphics.clear().s(this.lineColor).moveTo(src.x, src.y);
        for (let i=1; i<this.points.length; i++) {
            this.graphics.lineTo(this.points[i].x, this.points[i].y);
        }
    }

    adjustScale (dx, dy) {
        this.onMove();
    }

    stretch (east, south, west, north) {
        this.onMove();
    }

}
