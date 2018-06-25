import Handle from './Handle';

export default class ScaleHandle extends Handle {

    constructor (parent) {
        super(parent);
    }

    draw () {
        this.shape.graphics.clear().s('yellow').f('white')
            .drawCircle(0, 0, 5);
    }

}
