import Tool from '../Tool';
import Place from '../../figures/Place';

export default class PlaceTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Place Tool';
    }

    onMouseDown (event) {
        new Place(event.stageX, event.stageY).repaint();
    }

    onMouseMove (event) {

    }

    onMouseUp (event) {

    }
}
