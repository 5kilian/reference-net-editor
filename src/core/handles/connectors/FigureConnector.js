import { CenterOrientation } from '../../orientations/CenterOrientation';
import { Connector } from './Connector';


export class FigureConnector extends Connector {

    constructor (owner) {
        super(owner, new CenterOrientation(owner));
    }

    updatePosition () {
        super.updatePosition();
        this.redraw();
    }

    redraw () {
        this.graphics.clear().s('#00e600').f('transparent').ss(3)
            .drawRect(-this.owner.width / 2, -this.owner.height / 2, this.owner.width, this.owner.height);
        this.hitArea.graphics.clear().f('#000').ss(3)
            .drawRect(-this.owner.width / 2, -this.owner.height / 2, this.owner.width, this.owner.height);
    }

}
