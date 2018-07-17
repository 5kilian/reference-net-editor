import Tool from '../Tool';
import Drawing from '../../Drawing';
import RubberBand from '../../util/RubberBand';

export default class SelectionTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Selection Tool';
    }

    onMouseDown (event) {
        if (event.relatedTarget === null) {
            Drawing().selection.clear();
            this.rubberband = new RubberBand(event.stageX, event.stageY);
            Drawing().draw(this.rubberband.shape);
        }
    }

    onMouseMove (event) {
        if (this.rubberband !== undefined) {
            this.rubberband.draw(event.stageX, event.stageY);
        }
    }

    onMouseUp (event) {
        if (this.rubberband !== undefined) {
            Drawing().objects.forEach((object) => {
                let o = new createjs.Rectangle(object.x, object.y, object.width, object.height);
                let r = this.rubberband.rect();
                if (r.contains(o.x, o.y) && r.contains(o.x + o.width, o.y + o.height)) {
                    Drawing().selection.add(object);
                }
            });
            Drawing().erase(this.rubberband.shape);
            delete this.rubberband;
        }
    }
}
