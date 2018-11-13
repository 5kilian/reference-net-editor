import Tool from '../Tool';
import Circle from '../../figures/Circle';

export default class CircleTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Circle Tool';
    }

    onMouseDown (event) {
        let circle = new Circle(event.stageX, event.stageY);
        circle.move(-circle.width/2, -circle.height/2);
        circle.repaint();
    }

    onMouseMove (event) {

    }

    onMouseUp (event) {

    }
}
