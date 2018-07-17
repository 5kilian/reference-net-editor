import DrawingObject from '../DrawingObject';
import Drawing from '../Drawing';

import PlaceTool from './net/PlaceTool';
import TransitionTool from './net/TransitionTool';

export default class Palette extends DrawingObject {

    constructor () {
        super();
        this.type = 'toolbar';
        this.tools = [
            new PlaceTool(),
            new TransitionTool()
        ];
    }

    draw () {
        this.shape.graphics.clear().s('gray').f('white').drawRect(0, 0, Drawing().view.canvas.width, 32);

        this.tools.forEach(tool => tool.draw());

        return this;
    }

    add (tool) {
        this.tools.push(tool);
    }

}
