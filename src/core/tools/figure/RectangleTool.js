import Tool from '../Tool';
import Place from '../../figures/Place';
import Rectangle from '../../figures/Rectangle';

export default class RectangleTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Rectangle Tool';
    }

    onMouseDown (event) {
        new Rectangle(event.stageX, event.stageY).draw();
    }

    onMouseMove (event) {

    }

    onMouseUp (event) {

    }

}
