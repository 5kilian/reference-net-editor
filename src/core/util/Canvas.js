import DrawingEvent from '../Dispatcher';
import Selection from './Selection';
import Grid from './Grid';
import SelectionTool from '../tools/general/SelectionTool';
import RectangleTool from '../tools/figure/RectangleTool';
import CircleTool from '../tools/figure/CircleTool';
import ZoomTool from "../tools/general/ZoomTool";
import LineTool from '../tools/figure/LineTool';
import { KEYCODE_C, KEYCODE_L, KEYCODE_R, KEYCODE_V, KEYCODE_Z } from '../constants/KeyCodes';
import RubberBand from './RubberBand';
import Figure from '../figures/Figure';

export default class Canvas extends createjs.Stage {

    constructor (id, configuration) {
        super(id);
        this.id = id;

        this.on('stagemousedown', this.onMouseDown.bind(this));
        this.on('stagemousemove', this.onMouseMove.bind(this));
        this.on('stagemouseup', this.onMouseUp.bind(this));

        DrawingEvent().addEventListener('add', this.add.bind(this));
        DrawingEvent().addEventListener('remove', this.remove.bind(this));
        DrawingEvent().addEventListener('show grid', this.showGrid.bind(this));
        DrawingEvent().addEventListener('hide grid', this.hideGrid.bind(this));
        DrawingEvent().addEventListener('add all to selection', this.addAllToSelection.bind(this));
        DrawingEvent().addEventListener('use tool', this.useTool.bind(this));

        this.selection = new Selection();
        this.grid = new Grid();

        this.activeKeys = [];

        setTimeout(() => DrawingEvent().emit('use tool', 'selection'), 0);
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
        this.grid.repaint(this.canvas.width, this.canvas.height);
    }

    hideGrid () {
        this.grid.hide();
        this.grid.repaint(this.canvas.width, this.canvas.height);
    }

    addAllToSelection (rubberband) {
        this.selection.addAll(this.children.filter(child => (child instanceof Figure)).filter(child => {
            let rect = child.rect();
            return rubberband.contains(rect.x, rect.y, rect.width, rect.height);
        }));
    }

    useTool (tool) {
        switch (tool) {
            case 'selection':
                this.changeActiveTool(new SelectionTool());
                break;
            case 'rectangle':
                this.changeActiveTool(new RectangleTool());
                break;
            case 'circle':
                this.changeActiveTool(new CircleTool());
                break;
            case 'line':
                this.changeActiveTool(new LineTool());
                break;
            case 'zoom':
                this.changeActiveTool(new ZoomTool(this));
                break;
        }
    }

    changeActiveTool (tool) {
        delete this.activeTool;
        this.activeTool = tool;
        this.selection.clear();
    }

    onKeyEvent (event) {
        event.keys = this.activeKeys;
        this.selection.onKeyEvent(event);

        switch (this.activeKeys[ this.activeKeys.length - 1 ]) {
            case KEYCODE_V:
                DrawingEvent().emit('use tool', 'selection');
                break;
            case KEYCODE_R:
                DrawingEvent().emit('use tool', 'rectangle');
                break;
            case KEYCODE_L:
                DrawingEvent().emit('use tool', 'line');
                break;
            case KEYCODE_C:
                DrawingEvent().emit('use tool', 'circle');
                break;
            case KEYCODE_Z:
                DrawingEvent().emit('use tool', 'zoom');
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
