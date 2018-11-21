// import { ConnectionTool } from '../tools/general/ConnectionTool';
import { Handle } from './Handle';

export class ConnectionHandle extends Handle {

    constructor (owner, orientation) {
        super(owner, orientation);
        this.hitArea = new createjs.Shape(new createjs.Graphics().clear().f('#000').drawRect(-5, -5, 10, 10));
        this.alpha = 0;
    }

    update() {
    }

    redraw () {
        this.graphics.clear().s('#00e600').f('transparent').ss(3).drawRect(-4, -4, 8, 8);
    }

    onMouseOut(event) {
        this.alpha = 0;
    }

    onMouseOver(event) {
        console.log(this.parent);
        // if (this.parent.activeTool instanceof ConnectionTool) {
            this.alpha = 1;
        // }
    }

}
