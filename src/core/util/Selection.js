import { KEYCODE_DEL } from '../constants/KeyCodes';
import { DrawingShape } from '../drawing/DrawingShape';
import { CardinalScaleHandle } from '../handles/scalers/CardinalScaleHandle';
import { CardinalOrientation } from '../orientations/CardinalOrientation';
import DrawingEvent from '../drawing/DrawingEvent';


export class Selection extends DrawingShape {

    constructor () {
        super();
        this.objects = [];
        this.handles = [
            new CardinalScaleHandle(this, CardinalOrientation.NORTH),
            new CardinalScaleHandle(this, CardinalOrientation.NORTH_EAST),
            new CardinalScaleHandle(this, CardinalOrientation.EAST),
            new CardinalScaleHandle(this, CardinalOrientation.SOUTH_EAST),
            new CardinalScaleHandle(this, CardinalOrientation.SOUTH),
            new CardinalScaleHandle(this, CardinalOrientation.SOUTH_WEST),
            new CardinalScaleHandle(this, CardinalOrientation.WEST),
            new CardinalScaleHandle(this, CardinalOrientation.NORTH_WEST),
        ];

        this.hitArea = new createjs.Shape();

        this.hide();

        DrawingEvent.on('clear', this.clear.bind(this));
        DrawingEvent.on('select', this.select.bind(this));
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
            let o = this.objects[ i ].rect();
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
        this.hitArea.graphics.clear().s('#000').f('transparent').ss(8)
            .drawRect(0, 0, this.boundingBox.width, this.boundingBox.height);
    }

    adjustScale (dx, dy) {
        this.objects.forEach(object => object.adjustScale(dx, dy));
        this.onMove();
    }

    stretch (east, south, west, north) {
        this.objects.forEach(object => object.stretch(east, south, west, north));
        this.onMove();
    }

    updateHandles () {
        this.handles.forEach(handle => handle.updatePosition());
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
        let dx = (event.stageX - this.mx) / this.parent.scaleX;
        let dy = (event.stageY - this.my) / this.parent.scaleY;
        this.move(dx, dy);
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onPressUp (event) {
        this.mx = event.stageX;
        this.my = event.stageY;
    }

    onMove () {
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
        this.handles.forEach(handle => handle.show());
    }

}
