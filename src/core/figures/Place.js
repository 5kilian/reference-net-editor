import Figure from './Figure';
import ConnectionHandle from '../handles/ConnectionHandle';

export default class Place extends Figure {

    constructor (x, y) {
        super(x, y);
        this.type = 'place';
        this.width = 20;
        this.height = 20;
    }

    update () {

    }

    repaint () {
        this.graphics.clear().s(this.lineColor).f(this.fillColor)
            .drawEllipse(0, 0, this.width, this.height);
    }

    handles () {
        return [ new ConnectionHandle(this, this.width / 2, this.height / 2) ];
    }

}
