import { Orientation } from "./Orientation";
import { Point } from '../util/Point';


export class RelativeOrientation extends Orientation {

    constructor (owner, dx, dy) {
        super (owner);
        this.dx = dx;
        this.dy = dy;
    }

    position () {
        let rect = this.owner.rect();
        return new Point(
            rect.x + this.dx * rect.width,
            rect.y + this.dy * rect.height
        );
    }

}
