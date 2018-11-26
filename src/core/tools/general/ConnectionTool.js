import DrawingEvent from '../../drawing/DrawingEvent';
import { Connection } from '../../connections/Connection';
import { Connector } from '../../handles/connectors/Connector';
import { FigureConnector } from '../../handles/connectors/FigureConnector';
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
        if (this.connection) {
            let objects = this.stage.getObjectsUnderPoint(event.stageX, event.stageY);
            let connector = objects.find(object => object instanceof Connector);
            let dx = event.stageX;
            let dy = event.stageY;

            if (connector) {
                if (connector instanceof FigureConnector) {
                    connector = connector.owner.nearestConnector(event.stageX, event.stageY);
                }
                dx = connector.x;
                dy = connector.y;
            }
            this.dest.setValues(dx, dy);
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
