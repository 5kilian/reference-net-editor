import Drawing from '../Drawing';
import Handle from './Handle';
import Connection from '../connections/Connection';
import Transition from '../figures/Transition';
import Place from '../figures/Place';

export default class ConnectionHandle extends Handle {

    x () { return this.parent.x + this.parent.width / 2 };
    y () { return this.parent.y + this.parent.height / 2 };

    draw () {
        this.shape.visible = this.visible;
        this.shape.graphics.clear().s('black').f('white').drawCircle(this.x(), this.y(), 4);
    }

    onMouseDown (event) {
        this.line = new createjs.Shape();
        Drawing().draw(this.line);
        Drawing().top(this.shape);
    }

    onPressMove (event) {
        this.line.graphics.clear().beginStroke('black').moveTo(this.x(), this.y()).lineTo(event.stageX, event.stageY);
    }

    onPressUp (event) {
        Drawing().erase(this.line);
        let dest = Drawing().figureAt(event.stageX, event.stageY);
        if (dest === null) {
            switch (this.parent.type) {
                case 'place':
                    let transition = new Transition(event.stageX, event.stageY);
                    transition.move(-transition.width/2, -transition.height/2);
                    transition.draw();
                    let pt = new Connection(this.parent, transition);
                    pt.draw();
                    break;
                case 'transition':
                    let place = new Place(event.stageX, event.stageY);
                    place.move(-place.width/2, -place.height/2);
                    place.draw();
                    let tp = new Connection(this.parent, place);
                    tp.draw();
                    break;
                default:
            }
        } else {
            if (dest.type !== this.parent.type) {
                new Connection(this.parent, dest).draw();
            }
        }
    }

}
