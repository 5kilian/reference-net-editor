import Tool from '../Tool';
import RubberBand from '../../util/RubberBand';
import DrawingEvent from '../../Dispatcher';

export default class SelectionTool extends Tool {

    constructor (selection) {
        super();
        this.type = 'selection';
        this.icon = '';
        this.name = 'Selection Tool';
        this.selection = selection;
    }

    onMouseDown (event) {
        if (event.relatedTarget === null) {
            DrawingEvent().emit('clear selection');
            this.rubberband = new RubberBand(event.stageX, event.stageY);
            DrawingEvent().emit('add', this.rubberband);
        } else {
            DrawingEvent().emit('add to selection', event.relatedTarget);
            DrawingEvent().emit('show grid');
        }
    }

    onMouseMove (event) {
        if (this.rubberband !== undefined) {
            this.rubberband.repaint(event.stageX, event.stageY);
        }
    }

    onMouseUp (event) {
        if (this.rubberband !== undefined) {
            DrawingEvent().emit('add all to selection', this.rubberband.rect());
            DrawingEvent().emit('remove', this.rubberband);
            delete this.rubberband;
        } else {
            DrawingEvent().emit('hide grid');
        }
    }
}
