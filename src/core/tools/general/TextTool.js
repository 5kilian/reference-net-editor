import { Figure } from '../../figures/Figure';
import { PointOrientation } from '../../orientations/PointOrientation';
import { Tool } from '../Tool';
import { AbstractText } from '../../text/AbstractText';
import { Point } from '../../util/Point';


export class TextTool extends Tool {

    constructor (stage) {
        super(stage);
        this.icon = '';
        this.name = 'AbstractText Tool';
        this.position = new Point();
    }

    onMouseDown (event) {
        if (this.text) {
            this.text = null;
        } else {
            if (event.relatedTarget instanceof Figure) {
                this.text = event.relatedTarget.inscription;
            } else {
                this.text = new AbstractText(
                    new PointOrientation(
                        null,
                        this.position.setValues(event.stageX, event.stageY)
                    ),
                    'H'
                );
            }
            this.text.updatePosition();
        }
    }

    onMouseMove (event) { }

    onMouseUp (event) { }

    onToolDisable (event) { }

    onToolEnable (event) { }

    onKeyEvent (event) {
        if (this.text && event.lastKey) {
            this.text.text += String.fromCharCode(event.lastKey);
        }
    }

}