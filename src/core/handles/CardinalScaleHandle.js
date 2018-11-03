import Handle from './Handle';
import CardinalOrientation from '../orientations/CardinalOrientation';

export default class CardinalScaleHandle extends Handle {

    constructor (parent, orientation) {
        super(parent, new CardinalOrientation(parent, orientation));
    }

    repaint () {
        this.graphics.clear().s('#939393').f('white')
            .drawRect(-3, -3, 6, 6);
    }

    onMouseDown (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressMove (event) {
        let dx = Math.min((this.orientation.direction & CardinalOrientation.EAST)  || (this.orientation.direction & CardinalOrientation.WEST), 1);
        let dy = Math.min((this.orientation.direction & CardinalOrientation.NORTH) || (this.orientation.direction & CardinalOrientation.SOUTH), 1);
        this.owner.adjustScale(dx * (event.stageX - this.mx), dy * (event.stageY - this.my));
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressUp (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

}
