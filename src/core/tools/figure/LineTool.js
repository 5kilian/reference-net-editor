import Tool from '../Tool';
import Line from '../../figures/Line';

export default class LineTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Line Tool';
    }

    onMouseDown (event) {
        new Line(event.stageX, event.stageY).draw();
    }

    onMouseMove (event) {

    }

    onMouseUp (event) {

    }

}
