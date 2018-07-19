import DrawingObject from '../util/DrawingObject';
import Canvas from '../util/Canvas';

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

    repaint () {
        this.graphics.clear().s('gray').f('white').drawRect(0, 0, Canvas().view.canvas.width, 32);

        this.tools.forEach(tool => tool.repaint());

        return this;
    }

    add (tool) {
        this.tools.push(tool);
    }

}
