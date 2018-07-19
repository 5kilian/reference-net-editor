import Drawing from './Canvas';
import DrawingEvent from '../Dispatcher';

export default class Grid extends createjs.Shape {

    constructor () {
        super();
        this.visible = false;
        // Drawing().draw(this);
        // Drawing().bottom(this);
    }

    repaint (width, height) {
        this.graphics.clear();
        if (this.visible) {
            let x = Math.ceil(width / 20) + 1;
            let y = Math.ceil(height / 20) + 1;
            for (let i = 0; i < x; i++) {
                for (let j = 0; j < y; j++) {
                    this.graphics.f('gray').s('gray').drawCircle(i * 20, j * 20, 1);
                }
            }
        }
        return this;
    }

    show () {
        this.visible = true;
    }

    hide () {
        this.visible = false;
    }

}
