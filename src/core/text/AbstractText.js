import DrawingEvent from '../drawing/DrawingEvent';


export class AbstractText extends createjs.Text {

    constructor (orientation, content) {
        super();
        this.orientation = orientation;
        this.updatePosition();

        this.text = content;
        this.font = '20px Arial';
        this.color = 'black';

        DrawingEvent.emit('add', this);
    }

    updatePosition () {
        let position = this.orientation.position();
        this.x = position.x;
        this.y = position.y;
    }


    update () { }

    redraw () {

    }

    onShow () {

    }

    onHide () {

    }

}
