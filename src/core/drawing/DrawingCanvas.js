import DrawingEvent from './DrawingEvent';
import { Grid } from '../util/Grid';
import { SelectionTool } from '../tools/general/SelectionTool';
import { RectangleTool } from '../tools/figure/RectangleTool';
import { CircleTool } from '../tools/figure/CircleTool';
import { ZoomTool } from "../tools/general/ZoomTool";
import { LineTool } from '../tools/figure/LineTool';
import { ConnectionTool } from '../tools/general/ConnectionTool';
import { KEYCODE_C, KEYCODE_L, KEYCODE_R, KEYCODE_V, KEYCODE_Z } from '../constants/KeyCodes';

export class DrawingCanvas extends createjs.Stage {

    constructor (id, configuration) {
        super(id);
        this.id = id;

        this.enableMouseOver(20);

        this.on('stagemousedown', this.onMouseDown.bind(this));
        this.on('stagemousemove', this.onMouseMove.bind(this));
        this.on('stagemouseup', this.onMouseUp.bind(this));

        DrawingEvent.on('add', this.add.bind(this));
        DrawingEvent.on('remove', this.remove.bind(this));
        DrawingEvent.on('use', this.useTool.bind(this));
        DrawingEvent.on('top', this.top.bind(this));

        this.grid = new Grid();
        this.tools = [
            new SelectionTool(),
            new RectangleTool(),
            new CircleTool(),
            new LineTool(),
            new ConnectionTool(),
            new ZoomTool(this),
        ];

        this.activeKeys = [];
        this.activeTool = this.tools[0];
    }

    update (event) {
        super.update(event);
        this.children.forEach((object) => object.update());
    }

    add (shape) {
        if (!this.contains(shape)) {
            this.addChildAt(shape, this.numChildren);
        }
    }

    remove (shape) {
        if (this.contains(shape)) {
            this.removeChild(shape);
        }
    }

    top (shape) {
        if (this.contains(shape)) {
            this.setChildIndex(shape, this.numChildren - 1);
        }
    }

    bottom (shape) {
        if (this.contains(shape)) {
            this.setChildIndex(shape, 0);
        }
    }

    showGrid () {
        this.grid.show();
        this.grid.redraw(this.canvas.width, this.canvas.height);
    }

    hideGrid () {
        this.grid.hide();
        this.grid.redraw(this.canvas.width, this.canvas.height);
    }

    useTool (name) {
        this.tools.forEach(tool => {
            if (tool.constructor.name === name) {
                this.changeActiveTool(tool);
            }
        });
    }

    changeActiveTool (tool) {
        this.activeTool.onToolDisable();
        this.activeTool = tool;
        this.activeTool.onToolEnable();
    }

    onKeyEvent (event) {
        event.keys = this.activeKeys;

        switch (this.activeKeys[ this.activeKeys.length - 1 ]) {
            case KEYCODE_V:
                DrawingEvent.emit('use tool', 'SelectionTool');
                break;
            case KEYCODE_R:
                DrawingEvent.emit('use tool', 'RectangleTool');
                break;
            case KEYCODE_L:
                DrawingEvent.emit('use tool', 'LineTool');
                break;
            case KEYCODE_C:
                DrawingEvent.emit('use tool', 'CircleTool');
                break;
            case KEYCODE_Z:
                DrawingEvent.emit('use tool', 'ZoomTool');
                break;
            default:
        }
    }

    onMouseDown (event) {
        this.activeTool.onMouseDown(event);
    }

    onMouseMove (event) {
        this.activeTool.onMouseMove(event);
    }

    onMouseUp (event) {
        this.activeTool.onMouseUp(event);
    }

    onKeyDown (event) {
        if (this.activeKeys.indexOf(event.keyCode) === -1) {
            this.activeKeys.push(event.keyCode);
            this.keyChanged = true;
        }
    }

    onKeyUp (event) {
        this.activeKeys = this.activeKeys.filter(keyCode => keyCode !== event.keyCode);
        this.keyChanged = true;
    }

    onResize (event) {
        this.grid.repaint(this.canvas.width, this.canvas.height);
    }

}
