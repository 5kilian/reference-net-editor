import { KEYCODE_DOWN, KEYCODE_LEFT, KEYCODE_RIGHT, KEYCODE_UP } from './constants/KeyCodes';
import Drawing from './Drawing';

require('latest-createjs/lib/easeljs/easeljs');

export class Canvas {

    constructor (id, configuration = {}) {
        this.id = id;
        this.configuration = configuration;
        Drawing().initialize(id, configuration);
        Canvas.addListeners();
    }

    static addListeners () {
        window.addEventListener('resize', Canvas.onResize);

        document.addEventListener('keydown', Canvas.handleKeyDown);
        document.addEventListener('keyup', Canvas.handleKeyUp);

        createjs.Ticker.addEventListener('tick', Canvas.handleTick);
    }

    static removeListeners () {
        window.removeEventListener('resize', Canvas.onResize);

        document.removeEventListener('keydown', Canvas.handleKeyDown);
        document.removeEventListener('keyup', Canvas.handleKeyUp);

        createjs.Ticker.removeEventListener('tick', Canvas.handleTick);
    }

    static onResize (event) {
        let drawing = document.getElementById(this.id);
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

}
