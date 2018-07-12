import { KEYCODE_DOWN, KEYCODE_LEFT, KEYCODE_RIGHT, KEYCODE_UP } from './constants/KeyCodes';
import Drawing from './Drawing';

let config;

export class Canvas {

    constructor (id, configuration = {}) {
        config = configuration;
        config.id = id;
        Drawing().initialize(id, configuration);
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
        Drawing().onResize(event);
    }

    handleKeyDown (event) {
        if ([ KEYCODE_UP, KEYCODE_DOWN, KEYCODE_LEFT, KEYCODE_RIGHT ].indexOf(event.keyCode) > -1) {
            event.preventDefault();
        }
        Drawing().onKeyDown(event);
    }

    handleKeyUp (event) {
        Drawing().onKeyUp(event);
    }

    handleTick (event) {
        Drawing().update(event);

        if (Drawing().keyChanged) {
            Drawing().handleKeyEvent(event);
            Drawing().keyChanged = false;
        }
    }

}
