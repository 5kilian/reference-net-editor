import Drawing from '../Drawing';
import DrawingObject from '../DrawingObject';

export default class Figure extends DrawingObject {

    constructor (x, y) {
        super();
        this.handles = [];
        this.connections = [];

        this.updatePosition(x, y);
        this.width = 1;
        this.height = 1;
        this.lineColor = 'gray';
        this.fillColor = 'white';
    }

    remove () {
        let n = this.connections.length;
        for (let $i=0; $i<n; $i++) {
            this.connections[0].remove();
        }
        Drawing().remove(this);
    }

    move (dx, dy) {
        this.updatePosition(this.x + dx, this.y + dy);
    }

    updatePosition (x, y) {
        this.x = x;
        this.y = y;
        this.shape.x = x;
        this.shape.y = y;
        this.updateConnections();
        this.updateHandles();
    }

    updateConnections () {
        this.connections.forEach((connection) => connection.draw());
    }

    updateHandles () {
        this.handles.forEach((handle) => handle.draw());
    }

    onClick (event) {

    }

    onPressMove (event) {
        Drawing().selection.move(event.stageX - this.mx, event.stageY - this.my);
        this.mx = event.stageX;
        this.my = event.stageY;
        // this.updatePosition(event.stageX - this.width / 2, event.stageY - this.height / 2);
    }

    onPressUp (event) {
        // Drawing().grid.hide();
    }

    onMouseDown (event) {
        if (!Drawing().selection.contains(this)) {
            Drawing().selection.clear();
            Drawing().selection.add(this);
        }
        this.mx = event.stageX;
        this.my = event.stageY;
        // Drawing().grid.show();
    }

    onSelect () {
        this.showHandles();
    }

    onDeselect () {
        this.hideHandles();
    }

    showHandles () {
        this.handles.forEach((handle) => handle.show());
    }

    hideHandles () {
        this.handles.forEach((handle) => handle.hide());
    }

}
