import DrawingEvent from '../../drawing/DrawingEvent';
import { Connection } from '../../figures/Connection';
import { Figure } from '../../figures/Figure';
import { Tool } from '../Tool';


export class ConnectionTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Connection Tool';
        this.connection = null;
    }

    onMouseDown (event) {
        this.start = event.relatedTarget;
        if (this.start && this.start instanceof Figure) {
            let point = new createjs.Point(event.stageX, event.stageY);
            this.connection = new Connection(this.start.position(), point);
        }
    }

    onMouseMove (event) {
        if (this.connection) {
            this.connection.setDest(new createjs.Point(event.stageX, event.stageY));
            this.connection.redraw();
        }
    }

    onMouseUp (event) {
        let end = event.relatedTarget;
        if (end && end instanceof Figure) {
            this.connection.connect(this.start);
            this.connection.connect(end);
            this.connection.setDest(end.center());
            this.connection.redraw();
        } else if (this.connection) {
            this.connection.destroy();
        }
        this.connection = null;
    }

    onToolEnable (event) {
        DrawingEvent.emit('enable connectors');
    }

    onToolDisable (event) {
        DrawingEvent.emit('disable connectors');
    }

}
