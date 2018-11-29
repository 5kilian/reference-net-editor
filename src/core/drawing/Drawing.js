import { KEYCODE_ARROWS } from '../constants/KeyCodes';
import { EllipseTool } from '../tools/figure/EllipseTool';
import { LineTool } from '../tools/figure/LineTool';
import { RectangleTool } from '../tools/figure/RectangleTool';
import { ConnectionTool } from '../tools/general/ConnectionTool';
import { TextTool } from '../tools/general/TextTool';
import { ZoomTool } from '../tools/general/ZoomTool';
import { DrawingCanvas } from './DrawingCanvas';
import DrawingEvent from './DrawingEvent';


export default class Drawing {

    constructor (id, configuration = {
        fps: 60,
    }) {
        this.canvas = new DrawingCanvas(id, configuration);
        createjs.Ticker.framerate = configuration.fps;
        this.addListeners();

        this.register(TextTool);
        this.register(RectangleTool);
        this.register(EllipseTool);
        this.register(LineTool);
        this.register(ConnectionTool);
        this.register(ZoomTool);
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
        if (KEYCODE_ARROWS.indexOf(event.keyCode) > -1) {
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

    register (tool) {
        this.canvas.register(tool);
    }

    emit (event, payload) {
        DrawingEvent.emit(event, payload);
    }

    on (event, callback) {
        DrawingEvent.on(event, callback);
    }
}
