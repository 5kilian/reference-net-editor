import { KEYCODE_DOWN, KEYCODE_LEFT, KEYCODE_RIGHT, KEYCODE_UP } from './constants/KeyCodes';
import Drawing from './Drawing';

module.exports = class DrawingCanvas {

    constructor (id, configuration = {}) {
        Drawing().initialize(id, configuration);
        DrawingCanvas.addListeners();
    }

    static addListeners () {
        window.addEventListener('resize', DrawingCanvas.onResize);

        document.addEventListener('keydown', DrawingCanvas.handleKeyDown);
        document.addEventListener('keyup', DrawingCanvas.handleKeyUp);

        createjs.Ticker.addEventListener('tick', DrawingCanvas.handleTick);
    }

    static removeListeners () {
        window.removeEventListener('resize', DrawingCanvas.onResize);

        document.removeEventListener('keydown', DrawingCanvas.handleKeyDown);
        document.removeEventListener('keyup', DrawingCanvas.handleKeyUp);

        createjs.Ticker.removeEventListener('tick', DrawingCanvas.handleTick);
    }

    static onResize (event) {
        let drawing = document.getElementById('drawing-view');
        drawing.width = document.body.clientWidth;
        Drawing().onResize(event);
    }

    static handleKeyDown (event) {
        if ([KEYCODE_UP, KEYCODE_DOWN, KEYCODE_LEFT, KEYCODE_RIGHT].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
        Drawing().onKeyDown(event);
    }

    static handleKeyUp (event) {
        Drawing().onKeyUp(event);
    }

    static handleTick (event) {
        Drawing().update(event);

        if (Drawing().keyChanged) {
            Drawing().handleKeyEvent(event);
            Drawing().keyChanged = false;
        }
    }

};
