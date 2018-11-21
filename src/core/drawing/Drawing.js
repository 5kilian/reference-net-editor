import { KEYCODE_DOWN, KEYCODE_LEFT, KEYCODE_RIGHT, KEYCODE_UP } from '../constants/KeyCodes';
import { DrawingCanvas } from './DrawingCanvas';
import DrawingEvent from './DrawingEvent';

export default class Drawing {

    constructor (id, configuration = {}) {
        this.canvas = new DrawingCanvas(id, configuration);
        this.addListeners();
    }

    addListeners () {
        window.addEventListener('resize', this.onResize.bind(this));

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));

        createjs.Ticker.addEventListener('tick', this.onTick.bind(this));
    }

    removeListeners () {
        window.removeEventListener('resize', this.onResize.bind(this));

        document.removeEventListener('keydown', this.onKeyDown.bind(this));
        document.removeEventListener('keyup', this.onKeyUp.bind(this));

        createjs.Ticker.removeEventListener('tick', this.onTick.bind(this));
    }

    onResize (event) {
        let drawing = document.getElementById(this.canvas.id);
        drawing.width = document.body.clientWidth;
        drawing.height = document.body.clientHeight;
        this.canvas.onResize(event);
    }

    onKeyDown (event) {
        if ([ KEYCODE_UP, KEYCODE_DOWN, KEYCODE_LEFT, KEYCODE_RIGHT ].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
        this.canvas.onKeyDown(event);
    }

    onKeyUp (event) {
        this.canvas.onKeyUp(event);
    }

    onTick (event) {
        this.canvas.update(event);

        if (this.canvas.keyChanged) {
            this.canvas.onKeyEvent(event);
            this.canvas.keyChanged = false;
        }
    }

    emit (event, payload) {
        DrawingEvent.emit(event, payload);
    }

    on (event, callback) {
        DrawingEvent.on(event, callback);
    }
}
