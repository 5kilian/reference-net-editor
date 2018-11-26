import { Handle } from '../Handle';

/**
 * @abstract
 */
export class Connector extends Handle {

    constructor (owner, orientation) {
        super(owner, orientation);
        this.hitArea = new createjs.Shape(new createjs.Graphics().clear().f('#000').drawRect(-5, -5, 10, 10));
        this.alpha = 0;

        this.hide();
    }

    update() {
    }

    redraw () {
        this.graphics.clear().s('#00e600').f('transparent').ss(3)
            .drawRect(-4, -4, 8, 8);
    }

    onMouseOut(event) {
        this.alpha = 0;
    }

    onMouseOver(event) {
        this.alpha = 1;
    }

}
