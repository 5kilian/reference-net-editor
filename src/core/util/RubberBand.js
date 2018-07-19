export default class RubberBand extends createjs.Shape {

    constructor (x, y) {
        super();
        this.type = 'rubberband';
        this.x = x;
        this.y = y;
        this.dx = x;
        this.dy = y;
    }

    update () {

    }

    repaint (x, y) {
        this.dx = x;
        this.dy = y;
        let p = this.globalToLocal(this.dx, this.dy);
        this.graphics.clear().s('gray').f('transparent').drawRect(0, 0, p.x, p.y);
    }

    rect () {
        let x, y, w, h;

        w = Math.abs(this.x - this.dx);
        if (this.x < this.dx) {
            x = this.x;
        } else {
            x = this.dx;
        }
        h = Math.abs(this.y - this.dy);
        if (this.y < this.dy) {
            y = this.y;
        } else {
            y = this.dy;
        }

        return new createjs.Rectangle(x, y, w, h);
    }
}
