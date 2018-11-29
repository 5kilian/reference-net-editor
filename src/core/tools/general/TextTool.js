import { Tool } from '../Tool';
import { Text } from '../../text/Text';

export class TextTool extends Tool {

    constructor (stage) {
        super(stage);
        this.icon = '';
        this.name = 'Text Tool';
    }

    onMouseDown (event) {
        new Text(event.stageX, event.stageY, 'Hello world');
    }

    onMouseMove (event) { }

    onMouseUp (event) { }

    onToolDisable (event) { }

    onToolEnable (event) { }

}