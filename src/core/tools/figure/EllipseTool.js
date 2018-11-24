import { Tool } from '../Tool';
import { Ellipse } from '../../figures/Ellipse';


export class EllipseTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Circle Tool';
    }

    onMouseDown (event) {
        let circle = new Ellipse(event.stageX, event.stageY);
        circle.move(-circle.width / 2, -circle.height / 2);
        circle.redraw();
    }

    onMouseMove (event) { }

    onMouseUp (event) { }

    onToolDisable (event) { }

    onToolEnable (event) { }

}
