import { Tool } from '../Tool';
import { Line } from '../../figures/Line';

export class LineTool extends Tool {

    constructor (stage) {
        super(stage);
        this.icon = '';
        this.name = 'Line Tool';
        this.line = null;
        this.src = new createjs.Point();
        this.dest = new createjs.Point();
    }

    onMouseDown (event) {
        this.src.setValues(event.stageX, event.stageY);
        this.line = new Line(this.src, this.src);
    }

    onMouseMove (event) {
        if (this.line) {
            this.line.setDest(this.dest.setValues(event.stageX, event.stageY));
        }
    }

    onMouseUp (event) {
        this.line = null;
    }

}
