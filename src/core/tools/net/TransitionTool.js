import Tool from '../Tool';
import Transition from '../../figures/Transition';

export default class TransitionTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Transition Tool';
    }

    onMouseDown (event) {
        new Transition(event.stageX, event.stageY).repaint();
    }

    onMouseMove (event) {
    }

    onMouseUp (event) {
    }
}
