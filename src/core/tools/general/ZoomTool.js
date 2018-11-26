import { Tool } from '../Tool';

export class ZoomTool extends Tool {

    constructor (stage) {
        super(stage);
        this.icon = '';
        this.name = 'Zoom Tool';
    }

    onMouseDown(event) {
        this.stage.scale += 0.4;
    }

    onMouseMove(event) {
    }

    onMouseUp(event) {
    }
}
