import { Tool } from '../Tool';
import { Ellipse } from '../../figures/Ellipse';


export class EllipseTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Circle Tool';
        this.onset = new createjs.Point();
    }

    onMouseDown (event) {
        this.onset.setValues(event.stageX, event.stageY);
        this.circle = new Ellipse(this.onset.x, this.onset.y);
    }

    onMouseMove (event) {
        this.circle.x = (event.stageX - this.onset.x) < 0 ? event.stageX : this.onset.x;
        this.circle.y = (event.stageY - this.onset.y) < 0 ? event.stageY : this.onset.y;
        this.circle.width = Math.abs(this.onset.x - event.stageX);
        this.circle.height = Math.abs(this.onset.y - event.stageY);
        this.circle.redraw();
    }

    onMouseUp (event) {
        this.circle = null;
    }

    onToolDisable (event) { }

    onToolEnable (event) { }

}
