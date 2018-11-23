import { Selection } from '../../util/Selection';
import { Tool } from '../Tool';
import { RubberBand } from '../../util/RubberBand';
import { Figure } from '../../figures/Figure';

export class SelectionTool extends Tool {

    constructor () {
        super();
        this.selection = new Selection();
        this.rubberband = new RubberBand();
        this.selection.parent.addChild(this.rubberband);
    }

    onMouseDown (event) {
        if (event.relatedTarget instanceof Figure) {
            this.selection.select(event.relatedTarget);
        } else if (event.relatedTarget === null) {
            this.selection.clear();

            this.rubberband.setSrc(event.stageX, event.stageY);
            this.rubberband.redraw();
            this.rubberband.show();
        }
    }

    onMouseMove (event) {
        if (this.rubberband.visible) {
            this.rubberband.setDest(event.stageX, event.stageY);
            this.rubberband.redraw();
        }
    }

    onMouseUp (event) {
        if (this.rubberband.visible) {
            this.selection.addAll(event.target.children.filter(child => (child instanceof Figure)).filter(child => {
                let rect = child.rect();
                return this.rubberband.rect().contains(rect.x, rect.y, rect.width, rect.height);
            }));
            this.rubberband.hide();
        }
    }

    onToolDisable (event) {

    }

    onToolEnable (event) {

    }
}
