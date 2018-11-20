import Handle from './Handle';

export default class ConnectionHandle extends Handle {

    constructor (owner, orientation) {
        super(owner, orientation);
    }

    update() {
    }

    repaint () {
        this.graphics.clear().s('black').f('white').drawCircle(0, 0, 4);
    }

    onMouseDown (event) {

    }

    onPressMove (event) {

    }

    onPressUp (event) {

    }

    onClick(event) {
    }

    onDoubleClick(event) {
    }

    onMouseOut(event) {
    }

    onMouseOver(event) {
    }

}
