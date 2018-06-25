import DrawingObject from '../DrawingObject';
import Drawing from '../Drawing';

export default class ToolBar extends DrawingObject {

    constructor () {
        super();
        this.type = 'toolbar';
        this.tools = [];
    }

    draw () {
        this.shape.graphics.clear().s('gray').f('white').drawRect(0, 0, Drawing().view.canvas.width, 32);
        return this;
    }

}
