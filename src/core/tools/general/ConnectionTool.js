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
        this.setValues(this.src, event.stageX, event.stageY);
        this.connection = new Connection(this.src, this.src);
    }

    onMouseMove (event) {
        if (this.connection) {
            this.setValues(this.dest, event.stageX, event.stageY);
            this.connection.setDest(this.dest);
            this.connection.redraw();
        }
    }

    setValues (point, x, y) {
        let connector = this.nearestConnector(x, y);
        point.setValues(
            connector ? connector.x : x,
            connector ? connector.y : y
        );
    }

    nearestConnector (x, y) {
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
