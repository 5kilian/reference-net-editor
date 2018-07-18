import { KEYCODE_DOWN, KEYCODE_LEFT, KEYCODE_RIGHT, KEYCODE_UP } from './constants/KeyCodes';
import Canvas from './Canvas';

let config;

class Drawing {

    constructor (id, configuration = {}) {
        config = configuration;
        config.id = id;
        Canvas().initialize(id, configuration);
        this.addListeners();
    }

    addListeners () {
        window.addEventListener('resize', this.onResize);

        document.addEventListener('keydown', this.handleKeyDown);
        document.addEventListener('keyup', this.handleKeyUp);

        createjs.Ticker.addEventListener('tick', this.handleTick);
    }

    removeListeners () {
        window.removeEventListener('resize', this.onResize);

        document.removeEventListener('keydown', this.handleKeyDown);
        document.removeEventListener('keyup', this.handleKeyUp);

        createjs.Ticker.removeEventListener('tick', this.handleTick);
    }

    onResize (event) {
        let drawing = document.getElementById(config.id);
        drawing.width = document.body.clientWidth;
        drawing.height = document.body.clientHeight;
        Canvas().onResize(event);
    }

    handleKeyDown (event) {
        if ([ KEYCODE_UP, KEYCODE_DOWN, KEYCODE_LEFT, KEYCODE_RIGHT ].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
        Canvas().onKeyDown(event);
    }

    handleKeyUp (event) {
        Canvas().onKeyUp(event);
    }

    handleTick (event) {
        Canvas().update(event);

        if (Canvas().keyChanged) {
            Canvas().handleKeyEvent(event);
            Canvas().keyChanged = false;
        }
    }

}

module.exports = Drawing;
