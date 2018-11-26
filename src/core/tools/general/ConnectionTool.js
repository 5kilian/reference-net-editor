import DrawingEvent from '../../drawing/DrawingEvent';
import { Connection } from '../../connections/Connection';
import { Tool } from '../Tool';


export class ConnectionTool extends Tool {

    constructor (stage) {
        super(stage);
        this.icon = '';
        this.name = 'Connection Tool';
        this.src = new createjs.Point();
        this.dest = new createjs.Point();
    }

    onMouseDown (event) {
        if (event.relatedTarget) {
            this.src.setValues(event.relatedTarget.x, event.relatedTarget.y);
        } else {
            this.src.setValues(event.stageX, event.stageY);
        }
        this.connection = new Connection(this.src, this.src);
    }

    onMouseMove (event) {
        if (event.relatedTarget) {
            console.log(event.relatedTarget);
        }
        if (this.connection) {
            if (event.relatedTarget) {
                this.dest.setValues(event.relatedTarget.x, event.relatedTarget.y);
            } else {
                this.dest.setValues(event.stageX, event.stageY);
            }
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
