import DrawingEvent from '../Dispatcher';
import DrawingObject from '../util/DrawingObject';

/**
 * @abstract
 */
export default class Figure extends DrawingObject {

    constructor (x, y) {
        super();
        DrawingEvent().emit('add', this);

        this.handles = [];
        this.connections = [];

        this.x = 0;
        this.y = 0;
        this.width = 1;
        this.height = 1;
        this.lineColor = 'black';
        this.fillColor = 'white';

        this.updatePosition(x, y);
    }

    destroy () {
        DrawingEvent().emit('remove', this);
    }

    pos () {
        return new createjs.Point(this.x + this.width/2, this.y + this.height/2);
    }

    rect () {
        return new createjs.Rectangle(this.x, this.y, this.width, this.height);
    }

    remove () {
        let n = this.connections.length;
        for (let $i = 0; $i < n; $i++) {
            this.connections[ 0 ].remove();
        }
        DrawingEvent().emit('remove', this);
    }

    move (dx, dy) {
        this.updatePosition(this.x + dx, this.y + dy);
    }

    updatePosition (x, y) {
        super.updatePosition(x, y);
        this.connections.forEach(connection => connection.repaint());
    }

    adjustScale (dx, dy) {
        this.width = Math.max(0, this.width + dx);
        this.height = Math.max(0, this.height + dy);
        this.repaint();
    }

    stretch (east, south, west, north) {
        this.x = this.x + west;
        this.y = this.y + north;
        this.width = Math.max(0, this.width + east - west);
        this.height = Math.max(0, this.height + south - north);

        this.repaint();
    }

    updateConnections () {
        this.connections.forEach((connection) => connection.repaint());
    }

    updateHandles () {
        this.handles.forEach((handle) => handle.repaint());
    }

    showHandles () {
        this.handles.forEach((handle) => handle.show());
    }

    hideHandles () {
        this.handles.forEach((handle) => handle.hide());
    }

    onSelect () {
        this.showHandles();
    }

    onDeselect () {
        this.hideHandles();
    }

    onClick (event) {

    }

    onMouseDown (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressMove (event) {
        DrawingEvent().emit('move selection', { dx: event.stageX - this.mx, dy: event.stageY - this.my });
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressUp (event) {

    }

}
