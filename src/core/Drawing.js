import DrawingSelection from './Selection';

import Place from './figures/Place';
import Transition from './figures/Transition';
import Connection from './connections/Connection';
import Rubberband from './Rubberband';
import ToolBar from './tools/ToolBar';
import Grid from './Grid';

let drawing = null;

class Drawing {

    constructor () {
        let self = this;
    }

    initialize (id, configuration) {
        this.view = new createjs.Stage(id);
        this.view.on('stagemousedown', (event) => self.onMouseDown(event));
        this.view.on('stagemousemove', (event) => self.onMouseMove(event));
        this.view.on('stagemouseup', (event) => self.onMouseUp(event));
        this.objects = [];
        this.activeKeys = [];
        this.selection = new DrawingSelection();

        new Connection(
            new Place(100, document.getElementById('drawing-view').height / 2),
            new Transition(200, document.getElementById('drawing-view').height / 3));

        this.objects.forEach((object) => object.draw());
        this.objects.forEach((object) => object.type === 'handle' ? this.top(object.shape) : null);
        this.objects.forEach((object) => object.type === 'connection' ? this.bottom(object.shape) : null);

        this.toolbar = new ToolBar().draw();
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

    handleKeyEvent (event) {
        this.selection.handleKeyEvent(this.activeKeys, event);
    }

    onMouseDown (event) {
        if (event.relatedTarget === null) {
            this.selection.clear();
            this.rubberband = new Rubberband(event.stageX, event.stageY);
            this.draw(this.rubberband.shape);
        }
    }

    onMouseMove (event) {
        if (this.rubberband !== undefined) {
            this.rubberband.draw(event.stageX, event.stageY);
        }
    }

    onMouseUp (event) {
        if (this.rubberband !== undefined) {
            this.objects.forEach((object) => {
                let o = new createjs.Rectangle(object.x, object.y, object.width, object.height);
                let r = this.rubberband.rect();
                if (r.contains(o.x, o.y) && r.contains(o.x + o.width, o.y + o.height)) {
                    this.selection.add(object);
                }
            });
            this.erase(this.rubberband.shape);
            delete this.rubberband;
        }
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
        this.toolbar.draw();
    }

}

export default function getDrawing () {
    if (drawing === null) {
        drawing = new Drawing();
    }
    return drawing;
}
