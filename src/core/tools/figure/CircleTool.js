import Tool from '../Tool';
import Circle from '../../figures/Circle';

export default class CircleTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Circle Tool';
    }

    onMouseDown (event) {
        new Circle(event.stageX, event.stageY).repaint();
    }

    onMouseMove (event) {

    }

    onMouseUp (event) {

    }
}
