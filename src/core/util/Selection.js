import { KEYCODE_DEL } from '../constants/KeyCodes';
import DrawingEvent from '../drawing/DrawingEvent';
import { DrawingShape } from '../drawing/DrawingShape';
import { CardinalScaler } from '../handles/scalers/CardinalScaler';
import { CardinalOrientation } from '../orientations/CardinalOrientation';

export class Selection extends DrawingShape {

    constructor () {
        super();
        this.objects = [];
        this.handles = [
            new CardinalScaler(this, CardinalOrientation.NORTH),
            new CardinalScaler(this, CardinalOrientation.NORTH_EAST),
            new CardinalScaler(this, CardinalOrientation.EAST),
            new CardinalScaler(this, CardinalOrientation.SOUTH_EAST),
            new CardinalScaler(this, CardinalOrientation.SOUTH),
            new CardinalScaler(this, CardinalOrientation.SOUTH_WEST),
            new CardinalScaler(this, CardinalOrientation.WEST),
            new CardinalScaler(this, CardinalOrientation.NORTH_WEST),
        ];

        this.hitArea = new createjs.Shape();

        this.hide();
        DrawingEvent.on('selection move', this.onPressMove.bind(this));
    }

    update () {

    }

    toggle (object) {
        if (this.contains(object)) {
            this.remove(object);
        } else {
            this.add(object);
        }
    }

    select (object) {
        if (!this.contains(object)) {
            this.clear();
            this.add(object);
        }
    }

    addAll (objects) {
        objects.forEach(object => this.add(object));
    }

    add (object) {
        if (!this.contains(object)) {
            this.objects.push(object);
            object.onSelect();
            this.onSelectionChanged();
        }
    }

    move (dx, dy) {
        this.objects.forEach((object) => object.move(dx, dy));
        this.onMoveSelection();
    }

    remove (object) {
        if (this.contains(object)) {
            this.objects.splice(this.objects.indexOf(object), 1);
            object.onDeselect();
        }
        this.onSelectionChanged();
    }

    clear () {
        this.objects.forEach((object) => object.onDeselect());
        this.objects = [];
        this.onSelectionChanged();
    }

    empty () {
        return this.count() === 0;
    }

    count () {
        return this.objects.length;
    }

    contains (object) {
        return this.objects.includes(object);
    }

    rect () {
        if (this.objects.length === 0) {
            return this.boundingBox.setValues();
        }

        this.boundingBox.copy(this.objects[ 0 ].rect());
        for (let i = 1; i < this.objects.length; i++) {
            let o = this.objects[i].rect();
            this.boundingBox.extend(o.x, o.y, o.width, o.height);
        }
        return this.boundingBox.pad(10, 10, 10, 10);
    }

    redraw () {
        this.rect();
        this.x = this.boundingBox.x;
        this.y = this.boundingBox.y;
        this.graphics.clear().s('#939393').f('transparent')
            .drawRect(0, 0, this.boundingBox.width, this.boundingBox.height);
        this.hitArea.graphics.clear().s('#000').f('transparent').ss(4)
            .drawRect(0, 0, this.boundingBox.width, this.boundingBox.height);
    }

    adjustScale (dx, dy) {
        this.objects.forEach(object => object.adjustScale(dx, dy));
        this.redraw();
        this.updateHandles();
    }

    stretch (east, south, west, north) {
        this.objects.forEach(object => object.stretch(east, south, west, north));
        this.redraw();
        this.updateHandles();
    }

    updateHandles () {
        this.handles.forEach(handle => handle.updatePosition());
        this.objects.forEach(object => object.updateHandles());
    }

    onKeyEvent (event) {
        switch (event.keys[ event.keys.length - 1 ]) {
            case KEYCODE_DEL:
                this.objects.forEach((object) => object.destructor());
                this.clear();
                break;
            default:
        }
    }

    onClick (event) { }

    onDoubleClick (event) { }

    onMouseDown (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onMouseMove (event) { }

    onMouseOut (event) { }

    onMouseOver (event) { }

    onPressMove (event) {
        this.move(event.stageX - this.mx, event.stageY - this.my);
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressUp (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onMoveSelection () {
        this.redraw();
        this.updateHandles();
    }

    onSelectionChanged () {
        if (this.objects.length > 0) {
            this.redraw();
            this.updateHandles();
            this.show();
        } else {
            this.hide();
        }
    }

    onHide () {
        this.handles.forEach(handle => handle.hide());
    }

    onShow () {
        this.redraw();
        DrawingEvent.emit('top', this);
        this.handles.forEach(handle => handle.show());
    }

}
