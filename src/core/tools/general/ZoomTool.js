import { Tool } from '../Tool';

export class ZoomTool extends Tool {

    constructor (stage) {
        super();
        this.icon = '';
        this.name = 'Zoom Tool';
        this.stage = stage;
    }

    onMouseDown(event) {
        this.stage.scale += 0.4;
    }

    onMouseMove(event) {
    }

    onMouseUp(event) {
    }
}
