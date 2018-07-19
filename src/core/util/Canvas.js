import DrawingEvent from '../Dispatcher';
import Selection from './Selection';
import SelectionTool from '../tools/general/SelectionTool';
import PlaceTool from '../tools/net/PlaceTool';
import TransitionTool from '../tools/net/TransitionTool';
import Grid from './Grid';
import RectangleTool from '../tools/figure/RectangleTool';
import CircleTool from '../tools/figure/CircleTool';

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

        this.selection = new Selection();
        this.grid = new Grid();

        this.activeKeys = [];
        this.activeTool = new SelectionTool(this.selection);
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

    change (tool) {
        this.activeTool = tool;
    }

    showGrid () {
        this.grid.show();
        this.grid.repaint(this.canvas.width, this.canvas.height);
    }

    hideGrid () {
        this.grid.hide();
        this.grid.repaint(this.canvas.width, this.canvas.height);
    }

    addAllToSelection (rect) {
        this.children.forEach((object) => {
            let o = new createjs.Rectangle(object.x, object.y, object.width, object.height);
            if (rect !== rect && rect.contains(o.x, o.y) && rect.contains(o.x + o.width, o.y + o.height)) {
                this.selection.add(object);
            }
        });
    }

    onKeyEvent (event) {
        event.keys = this.activeKeys;
        this.selection.onKeyEvent(event);

        switch (this.activeKeys[ this.activeKeys.length - 1 ]) {
            case 80:
                this.activeTool = new PlaceTool();
                break;
            case 84:
                this.activeTool = new TransitionTool();
                break;
            case 86:
                this.activeTool = new SelectionTool();
                break;
            case 82:
                this.activeTool = new RectangleTool();
                break;
            case 67:
                this.activeTool = new CircleTool();
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
