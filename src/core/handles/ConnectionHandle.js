import Handle from './Handle';

export default class ConnectionHandle extends Handle {

    constructor (owner, orientation) {
        super(owner, orientation);
        this.hitArea = new createjs.Shape(new createjs.Graphics().clear().f('#000').drawRect(-5, -5, 10, 10));
        console.log(this.hitArea);
        this.alpha = 0;
    }

    update() {
    }

    repaint () {
        this.graphics.clear().s('#00e600').f('transparent').ss(3).drawRect(-4, -4, 8, 8);
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
        this.alpha = 0;
    }

    onMouseOver(event) {
        this.alpha = 1;
    }

}
