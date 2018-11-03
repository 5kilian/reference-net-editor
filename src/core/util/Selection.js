import { KEYCODE_DEL } from '../constants/KeyCodes';
import CardinalScaleHandle from '../handles/CardinalScaleHandle';
import DrawingEvent from '../Dispatcher';
import CardinalOrientation from '../orientations/CardinalOrientation';

export default class Selection extends createjs.Shape {

    constructor () {
        super();
        this.objects = [];
        this.type = 'selection';
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

        this.changed = false;

        DrawingEvent().addEventListener('select', this.select.bind(this));
        DrawingEvent().addEventListener('add to selection', this.add.bind(this));
        DrawingEvent().addEventListener('clear selection', this.clear.bind(this));
        DrawingEvent().addEventListener('move selection', this.onMoveSelection.bind(this));
        DrawingEvent().addEventListener('change selection', this.onChange.bind(this));
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
            this.onChange();
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
        this.onChange();
    }

    clear () {
        this.objects.forEach((object) => object.onDeselect());
        this.objects = [];
        this.onChange();
    }

    count () {
        return this.objects.length;
    }

    contains (object) {
        return this.objects.includes(object);
    }

    rect () {
        let rect = new createjs.Rectangle();
        if (this.objects.length === 0) {
            return rect;
        }

        rect.copy(this.objects[ 0 ].rect());
        for (let i = 1; i < this.objects.length; i++) {
            let o = this.objects[i].rect();
            rect.extend(o.x, o.y, o.width, o.height);
        }
        return rect.setValues(rect.x -10, rect.y -10, rect.width +20, rect.height +20);
    }

    repaint () {
        let rect = this.rect();

        this.x = rect.x;
        this.y = rect.y;
        this.graphics.clear().s('#939393').f('transparent')
            .drawRect(0, 0, rect.width, rect.height);
    }

    adjustScale (dx, dy) {
        this.objects.forEach(object => object.adjustScale(dx, dy));
        this.repaint();
        this.updateHandles();
    }

    stretch (east, south, west, north) {
        this.objects.forEach(object => object.stretch(east, south, west, north));
        this.repaint();
        this.updateHandles();
    }

    updateHandles () {
        this.handles.forEach(handle => handle.updatePosition());
        this.objects.forEach(object => object.updateHandles());
    }

    onMoveSelection (event) {
        this.move(event.dx, event.dy);
        this.repaint();
        this.updateHandles();
    }

    onKeyEvent (event) {
        switch (event.keys[ event.keys.length - 1 ]) {
            case KEYCODE_DEL:
                this.objects.forEach((object) => object.remove());
                this.clear();
                break;
            default:
        }
    }

    onChange () {
        if (this.objects.length > 0) {
            DrawingEvent().emit('add', this);
            this.repaint();
            this.updateHandles();
            this.handles.forEach(handle => handle.show());
        } else {
            DrawingEvent().emit('remove', this);
            this.handles.forEach(handle => handle.hide());
        }
    }
}
