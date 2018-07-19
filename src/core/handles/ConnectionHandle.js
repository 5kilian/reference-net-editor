import Canvas from '../util/Canvas';
import Handle from './Handle';
import Connection from '../connections/Connection';
import Transition from '../figures/Transition';
import Place from '../figures/Place';

export default class ConnectionHandle extends Handle {

    repaint () {
        this.graphics.clear().s('black').f('white').drawCircle(0, 0, 4);
    }

    onMouseDown (event) {
        this.line = new createjs.Shape();
        // Canvas().draw(this.line);
        // Canvas().top(this);
    }

    onPressMove (event) {
        this.x = this.parent.x + this.parent.width / 2;
        this.y = this.parent.y + this.parent.height / 2;

        this.line.graphics.clear().beginStroke('black').moveTo(this.x, this.y).lineTo(event.stageX, event.stageY);
    }

    onPressUp (event) {
        // Canvas().erase(this.line);
        // let dest = Canvas().figureAt(event.stageX, event.stageY);
        let dest = null;
        if (dest === null) {
            switch (this.parent.type) {
                case 'place':
                    let transition = new Transition(event.stageX, event.stageY);
                    transition.move(-transition.width/2, -transition.height/2);
                    transition.repaint();
                    let pt = new Connection(this.parent, transition);
                    pt.repaint();
                    break;
                case 'transition':
                    let place = new Place(event.stageX, event.stageY);
                    place.move(-place.width/2, -place.height/2);
                    place.repaint();
                    let tp = new Connection(this.parent, place);
                    tp.repaint();
                    break;
                default:
            }
        } else {
            if (dest.type !== this.parent.type) {
                new Connection(this.parent, dest).repaint();
            }
        }
    }

}
