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
        this.src.setValues(event.stageX, event.stageY);
        this.src.connector = null;

        let connector = this.nearestConnector(this.src);
        if (connector) {
            this.src.copy(connector);
            this.src.connector = connector;
        }

        this.connection = new Connection(this.src, this.src);
        this.connection.strokes = true;
    }

    onMouseMove (event) {
        if (this.connection) {
            this.dest.setValues(event.stageX, event.stageY);
            this.dest.connector = undefined;

            let connector = this.nearestConnector(this.dest);
            if (connector) {
                this.dest.copy(connector);
                this.dest.connector = connector;
            }

            this.connection.setDest(this.dest);
        }
    }

    onMouseUp (event) {
        this.connection.strokes = false;
        this.connection.connectDest(this.dest.connector);
        this.connection.redraw();
        this.connection = null;
    }

    nearestConnector (point) {
        return this.nearestConnectorAt(point.x, point.y)
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
