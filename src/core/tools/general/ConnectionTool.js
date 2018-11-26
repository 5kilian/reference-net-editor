import DrawingEvent from '../../drawing/DrawingEvent';
import { Connection } from '../../connections/Connection';
import { Tool } from '../Tool';


export class ConnectionTool extends Tool {

    constructor () {
        super();
        this.icon = '';
        this.name = 'Connection Tool';
        this.src = new createjs.Point();
        this.dest = new createjs.Point();
    }

    onMouseDown (event) {
        this.src.setValues(event.stageX, event.stageY);
        this.connection = new Connection(this.src, this.src);
    }

    onMouseMove (event) {
        this.dest.setValues(event.stageX, event.stageY);
        if (this.connection) {
            this.connection.setDest(this.dest);
            this.connection.redraw();
        }
    }

    onMouseUp (event) {
        if (this.connection) {
            this.connection.destructor();
            this.connection = null;
        }
    }

    onToolEnable (event) {
        DrawingEvent.emit('enable connectors');
    }

    onToolDisable (event) {
        DrawingEvent.emit('disable connectors');
    }

}
