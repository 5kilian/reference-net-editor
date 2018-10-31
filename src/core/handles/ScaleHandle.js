import Handle from './Handle';

export default class ScaleHandle extends Handle {

    constructor (parent, orientation, direction) {
        super(parent, orientation);
        this.direction = direction;
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
        let dx = (this.direction & ScaleHandle.AXIS_X) > 0;
        let dy = (this.direction & ScaleHandle.AXIS_Y) > 0;
        this.owner.adjustScale(dx * (event.stageX - this.mx), dy * (event.stageY - this.my));
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressUp (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    static get AXIS_X () {
        return 1;
    }

    static get AXIS_Y () {
        return 2;
    }

    static get AXIS_XY () {
        return 3;
    }

}
