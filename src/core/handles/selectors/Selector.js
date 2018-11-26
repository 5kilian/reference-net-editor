import { Handle } from '../Handle';

export class Selector extends Handle {

    constructor (owner, orientation) {
        super(owner, orientation);
        this.hide();
        this.hitArea = new createjs.Shape();
    }

    update() {
    }

    redraw () {
        this.graphics.clear().s('#0952e6').f('transparent').ss(3)
            .drawRect(-4, -4, 8, 8);
    }

}
