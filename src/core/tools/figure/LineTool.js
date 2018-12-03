import { Tool } from '../Tool';
import { Line } from '../../figures/Line';
import { Point } from '../../util/Point';


export class LineTool extends Tool {

    constructor (stage) {
        super(stage);
        this.icon = '';
        this.name = 'Line Tool';
        this.line = null;
    }

    onMouseDown (event) {
        this.line = new Line(event.stageX, event.stageY);
    }

    onMouseMove (event) {
        if (this.line) {
            this.line.setDest(event.stageX, event.stageY);
        }
    }

    onMouseUp (event) {
        this.line = null;
    }

    onKeyEvent (event) { }

    onToolDisable (event) { }

    onToolEnable (event) { }

}
