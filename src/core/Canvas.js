import DrawingSelection from './util/Selection';
import SelectionTool from './tools/general/SelectionTool';
import PlaceTool from './tools/net/PlaceTool';
import TransitionTool from './tools/net/TransitionTool';
import Grid from './util/Grid';
import RectangleTool from './tools/figure/RectangleTool';
import CircleTool from './tools/figure/CircleTool';

class Canvas {

    constructor () { }

    initialize (id, configuration) {
        let self = this;

        this.view = new createjs.Stage(id);
        this.view.on('stagemousedown', (event) => self.onMouseDown(event));
        this.view.on('stagemousemove', (event) => self.onMouseMove(event));
        this.view.on('stagemouseup', (event) => self.onMouseUp(event));

        this.objects = [];

        this.activeKeys = [];
        this.activeTool = new SelectionTool();

        this.selection = new DrawingSelection();

        this.grid = new Grid().draw();
    }

    add (object) {
        this.objects.push(object);
        this.draw(object.shape);
    }

    remove (object) {
        this.erase(object.shape);
        this.objects.splice(this.objects.indexOf(object), 1);
    }

    figureAt (x, y) {
        for (let i = 0; i < this.objects.length; i++) {
            switch (this.objects[i].type) {
                case 'place':
                case 'transition':
                    let p = this.objects[i].shape.globalToLocal(x, y);
                    if (this.objects[i].shape.hitTest(p.x, p.y)) {
                        return this.objects[i];
                    }
                    break;
                default:
            }
        }
        return null;
    }

    draw (shape) {
        if (!this.view.contains(shape)) {
            this.view.addChildAt(shape, this.view.numChildren);
        }
    }

    erase (shape) {
        if (this.view.contains(shape)) {
            this.view.removeChild(shape);
        }
    }

    top (shape) {
        if (this.view.contains(shape)) {
            this.view.setChildIndex(shape, this.view.numChildren - 1);
        }
    }

    bottom (shape) {
        if (this.view.contains(shape)) {
            this.view.setChildIndex(shape, 0);
        }
    }

    update (event) {
        this.objects.forEach((object) => object.update());
        this.view.update(event);
    }

    click (event) {

    }

    change (tool) {
        this.activeTool = tool;

    }

    handleKeyEvent (event) {
        this.selection.handleKeyEvent(this.activeKeys, event);

        switch (this.activeKeys[this.activeKeys.length-1]) {
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

    }

}

let canvas = null;

export default function getCanvas () {
    if (canvas === null) {
        canvas = new Canvas();
    }
    return canvas;
}
