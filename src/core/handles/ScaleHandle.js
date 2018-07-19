import Handle from './Handle';

export default class ScaleHandle extends Handle {

    constructor (parent) {
        super(parent);
        this.x = parent.x + parent.width;
        this.y = parent.y + parent.height;
    }

    repaint () {
        this.graphics.clear().s('#939393').f('white')
            .drawRect(0, 0, 5, 5);
    }

    onMouseDown (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressMove (event) {
        parent.scale(event.stageX - this.mx, event.stageY - this.my);
    }

    onPressUp (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

}
