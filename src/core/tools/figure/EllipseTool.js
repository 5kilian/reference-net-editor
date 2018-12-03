import { Tool } from '../Tool';
import { Ellipse } from '../../figures/Ellipse';
import { Point } from '../../util/Point';


export class EllipseTool extends Tool {

    constructor (stage) {
        super(stage);
        this.icon = '';
        this.name = 'Circle Tool';
        this.onset = new Point();
    }

    onMouseDown (event) {
        this.moved = false;
        this.onset.setValues(event.stageX, event.stageY);
        this.circle = new Ellipse(this.onset.x, this.onset.y);
        this.circle.x -= 20;
        this.circle.y -= 20;
        this.circle.width = 40;
        this.circle.height = 40;
    }

    onMouseMove (event) {
        if (this.circle) {
            let leftOf = (event.stageX - this.onset.x) < 0;
            let topOf = (event.stageY - this.onset.y) < 0;
            this.circle.x = leftOf ? event.stageX : this.onset.x;
            this.circle.y = topOf ? event.stageY : this.onset.y;
            this.circle.width = Math.abs(this.onset.x - event.stageX);
            this.circle.height = Math.abs(this.onset.y - event.stageY);
            this.circle.redraw();
        }
    }

    stickToGrid (value) {
        if ((value % 10) < 3) {
            return Math.floor(value / 10) * 10
        }
        if ((value % 10) > 7) {
            return (Math.floor(value / 10) * 10) + 10
        }
        return value
    }

    onMouseUp (event) {
        this.circle.redraw();
        this.circle = null;
    }

    onToolDisable (event) { }

    onToolEnable (event) { }

}
