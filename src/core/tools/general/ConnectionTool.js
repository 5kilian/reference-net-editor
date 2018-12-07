import { CollisionConnection } from '../../connections/CollisionConnection';
import DrawingEvent from '../../drawing/DrawingEvent';
import { Connector } from '../../handles/connectors/Connector';
import { Tool } from '../Tool';


export class ConnectionTool extends Tool {

    constructor (stage) {
        super(stage);
    }

    onMouseDown (event) {
        this.connection = new CollisionConnection(event.stageX, event.stageY);

        let connector = this.nearestConnectorAt(event.stageX, event.stageY);
        if (connector) {
            this.connection.updatePosition(connector.x, connector.y);
            this.connection.connectSrc(connector.owner);
        }
        this.connection.src().connector = connector;

        this.connection.strokes = true;
    }

    onMouseMove (event) {
        if (this.connection) {
            this.connection.setDest(event.stageX, event.stageY);

            let connector = this.nearestConnectorAt(event.stageX, event.stageY);
            if (connector) {
                this.connection.setDest(connector.x, connector.y);
            }
            this.connection.dest().connector = connector;
            this.connection.updatePositions();
        }
    }

    onMouseUp (event) {
        if (this.connection.dest().connector) {
            this.connection.connectDest(this.connection.dest().connector.owner);
        }
        this.connection.strokes = false;
        this.connection.redraw();
        this.connection = null;
    }

    nearestConnectorAt (x, y) {
        let objects = this.stage.getObjectsUnderPoint(x, y);
        return objects.find(object => object instanceof Connector);
    }

    onToolEnable (event) {
        DrawingEvent.emit('enable connectors');
    }

    onToolDisable (event) {
        DrawingEvent.emit('disable connectors');
    }

}
