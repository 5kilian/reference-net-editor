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
    }

    onMouseDown (event) {
        this.connection = new Connection(event.stageX, event.stageY);

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
        let connector = objects.find(object => object instanceof Connector);

        if (connector) {
            if (connector instanceof FigureConnector) {
                return connector.owner.nearestConnector(x, y);
            }
            return connector;
        }
        return false;
    }

    onToolEnable (event) {
        DrawingEvent.emit('enable connectors');
    }

    onToolDisable (event) {
        DrawingEvent.emit('disable connectors');
    }

}
