import Tool from '../Tool';
import Canvas from '../../Canvas';
import RubberBand from '../../util/RubberBand';

export default class SelectionTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Selection Tool';
    }

    onMouseDown (event) {
        if (event.relatedTarget === null) {
            Canvas().selection.clear();
            this.rubberband = new RubberBand(event.stageX, event.stageY);
            Canvas().draw(this.rubberband.shape);
        }
    }

    onMouseMove (event) {
        if (this.rubberband !== undefined) {
            this.rubberband.draw(event.stageX, event.stageY);
        }
    }

    onMouseUp (event) {
        if (this.rubberband !== undefined) {
            Canvas().objects.forEach((object) => {
                let o = new createjs.Rectangle(object.x, object.y, object.width, object.height);
                let r = this.rubberband.rect();
                if (r.contains(o.x, o.y) && r.contains(o.x + o.width, o.y + o.height)) {
                    Canvas().selection.add(object);
                }
            });
            Canvas().erase(this.rubberband.shape);
            delete this.rubberband;
        }
    }
}
