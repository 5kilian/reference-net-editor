import DrawingEvent from '../drawing/DrawingEvent';


export class Text extends createjs.Text {

    constructor (x, y, content) {
        super();
        this.updatePosition(x, y);

        this.text = content;
        this.font = '20px Arial';
        this.color = 'black';

        DrawingEvent.emit('add', this);
    }

    updatePosition (x, y) {
        this.x = x;
        this.y = y;
    }


    update () { }

    redraw () {

    }

    onShow () {

    }

    onHide () {

    }

}
