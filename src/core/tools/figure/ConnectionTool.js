import Tool from '../Tool';
import Connection from '../../figures/Connection';
import Figure from '../../figures/Figure';

export default class ConnectionTool extends Tool {

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
            this.connection = new Connection(this.start.pos(), point);
        }
    }

    onMouseMove (event) {
        if (this.connection) {
            this.connection.setDest(new createjs.Point(event.stageX, event.stageY));
            this.connection.repaint();
        }
    }

    onMouseUp (event) {
        let end = event.relatedTarget;
        if (end && end instanceof Figure) {
            this.connection.connect(this.start);
            this.connection.connect(end);
            this.connection.setDest(end.pos());
            this.connection.repaint();
        } else if (this.connection) {
            this.connection.destroy();
        }
        this.connection = null;
    }

}
