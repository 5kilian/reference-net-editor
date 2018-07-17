export default class RubberBand {

    constructor (x, y) {
        this.shape = new createjs.Shape();
        this.x = x;
        this.y = y;
        this.dx = x;
        this.dy = y;
        this.shape.x = x;
        this.shape.y = y;
    }

    draw (x, y) {
        let p = this.shape.globalToLocal(x, y);
        this.shape.graphics.clear().s('gray').f('transparent').drawRect(0, 0, p.x, p.y);
        this.dx = x;
        this.dy = y;
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
