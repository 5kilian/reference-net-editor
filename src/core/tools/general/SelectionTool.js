import { KEYCODE_DEL } from '../../constants/KeyCodes';
import { Selection } from '../../util/Selection';
import { Tool } from '../Tool';
import { RubberBand } from '../../util/RubberBand';
import { Figure } from '../../figures/Figure';
import { Text } from '../../text/Text';

export class SelectionTool extends Tool {

    constructor (stage) {
        super(stage);
        this.selection = new Selection();
        this.rubberband = new RubberBand();
        this.selection.parent.addChild(this.rubberband);
    }

    onMouseDown (event) {
        if (event.relatedTarget instanceof Figure || event.relatedTarget instanceof Text) {
            this.selection.select(event.relatedTarget);
        } else if (event.relatedTarget === null) {
            this.selection.clear();

            let dx = event.stageX / this.rubberband.parent.scaleX;
            let dy = event.stageY / this.rubberband.parent.scaleY;
            this.rubberband.setSrc(dx, dy);
            this.rubberband.redraw();
            this.rubberband.show();
        }
    }

    onMouseMove (event) {
        if (this.rubberband.visible) {
            let dx = event.stageX / this.rubberband.parent.scaleX;
            let dy = event.stageY / this.rubberband.parent.scaleY;
            this.rubberband.setDest(dx, dy);
            this.rubberband.redraw();
        }
    }

    onMouseUp (event) {
        if (this.rubberband.visible) {
            this.selection.addAll(event.target.children.filter(child => {
                return child instanceof Figure
            }).filter(child => {
                let rect = child.rect();
                return this.rubberband.rect().contains(
                    rect.x,
                    rect.y,
                    rect.width,
                    rect.height
                );
            }));
            this.rubberband.hide();
        }
    }

    onToolDisable (event) {

    }

    onToolEnable (event) {

    }

    onKeyEvent (event) {
        switch (event.lastKey) {
            case KEYCODE_DEL:
                this.selection.objects.forEach((object) => object.destructor());
                this.selection.clear();
                break;
            default:
        }
    }

 }
