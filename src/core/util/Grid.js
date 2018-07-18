import Drawing from '../Canvas';

export default class Grid {

    constructor () {
        this.shape = new createjs.Shape();
        this.visible = false;
        Drawing().draw(this.shape);
        Drawing().bottom(this.shape);
    }

    draw () {
        this.shape.graphics.clear();
        if (this.visible) {
            let x = Math.ceil(Drawing().view.canvas.width / 20) + 1;
            let y = Math.ceil(Drawing().view.canvas.height / 20) + 1;
            for (let i = 0; i < x; i++) {
                for (let j = 0; j < y; j++) {
                    this.shape.graphics.f('gray').s('gray').drawCircle(i * 20, j * 20, 1);
                }
            }
        }
        return this;
    }

    show () {
        this.visible = true;
        this.draw();
    }

    hide () {
        this.visible = false;
        this.draw();
    }

}
