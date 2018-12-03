import { Figure } from '../figures/Figure';
import { Handle } from '../handles/Handle';
import DrawingEvent from './DrawingEvent';
import { Grid } from '../util/Grid';
import { SelectionTool } from '../tools/general/SelectionTool';

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
        DrawingEvent.on('bottom', this.bottom.bind(this));

        this.grid = new Grid();
        this.tools = [ ];

        this.figures = [ ];
        this.handles = [ ];

        this.activeKeys = [ ];
        this.register(SelectionTool);
        this.activeTool = this.tools[0];
    }

    register (tool) {
        this.tools.push(new tool(this));
    }

    update (event) {
        super.update(event);
        this.children.forEach((object) => object.update());
    }

    add (shape) {
        if (!this.contains(shape)) {
            let insertPosition = this.numChildren;

            if (shape instanceof Selection) {
                insertPosition = this.figures.length
            } else if (shape instanceof Figure) {
                this.figures.push(shape);
                insertPosition = this.figures.length;
            } else if (shape instanceof Handle) {
                this.handles.push(shape);
                insertPosition = this.figures.length + this.handles.length;
            }

            this.addChildAt(shape, insertPosition);
        }
    }

    remove (shape) {
        if (this.contains(shape)) {
            this.removeChild(shape);
            if (shape instanceof Figure) {
                this.figures.splice(this.figures.indexOf(shape), 1);
            } else if (shape instanceof Handle) {
                this.handles.splice(this.handles.indexOf(shape), 1);
            }
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
        event.lastKey = this.activeKeys[ this.activeKeys.length - 1 ];
        event.preventToolChange = false;

        this.activeTool.onKeyEvent(event);

        if (false && event.preventToolChange) {
            this.tools.forEach(tool => {
                if (tool.keyCode === event.lastKey) {
                    this.changeActiveTool(tool);
                }
            });
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
        this.activeKeys = this.activeKeys.filter(keyCode => {
            return keyCode !== event.keyCode
        });
        this.keyChanged = true;
    }

    onResize (event) {
        this.grid.redraw(this.canvas.width, this.canvas.height);
    }

}
