import { Figure } from '../../figures/Figure';
import { PointOrientation } from '../../orientations/PointOrientation';
import { Tool } from '../Tool';
import { AbstractText } from '../../text/AbstractText';

export class TextTool extends Tool {

    constructor (stage) {
        super(stage);
        this.icon = '';
        this.name = 'AbstractText Tool';
        this.position = new createjs.Point();
    }

    onMouseDown (event) {
        if (event.relatedTarget instanceof Figure) {
            event.relatedTarget.setInscription('Hello world');
        } else {
            new AbstractText(
                new PointOrientation(null, this.position.setValues(event.stageX, event.stageY)),
                'Hello world'
            );
        }
    }

    onMouseMove (event) { }

    onMouseUp (event) { }

    onToolDisable (event) { }

    onToolEnable (event) { }

}