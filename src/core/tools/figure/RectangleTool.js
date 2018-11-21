import { Tool } from '../Tool';
import { Rectangle } from '../../figures/Rectangle';

export class RectangleTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Rectangle Tool';
    }

    onMouseDown (event) {
        let rectangle = new Rectangle(event.stageX, event.stageY);
        rectangle.move(-rectangle.width/2, -rectangle.height/2);
        rectangle.redraw();
    }

    onMouseMove (event) {

    }

    onMouseUp (event) {

    }

}
