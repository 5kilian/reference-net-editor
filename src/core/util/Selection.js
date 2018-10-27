import { KEYCODE_DEL } from '../constants/KeyCodes';
import ScaleHandle from '../handles/ScaleHandle';
import DrawingEvent from '../Dispatcher';

export default class Selection extends createjs.Shape {

    constructor () {
        super();
        this.objects = [];
        this.handles = [ new ScaleHandle(this) ];

        this.changed = false;

        DrawingEvent().addEventListener('select', this.select.bind(this));
        DrawingEvent().addEventListener('add to selection', this.add.bind(this));
        DrawingEvent().addEventListener('clear selection', this.clear.bind(this));
        DrawingEvent().addEventListener('move selection', this.onMoveSelection.bind(this));
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
        return rect;
    }

    repaint () {
        let rect = this.rect();

        this.x = rect.x;
        this.y = rect.y;
        this.graphics.clear().s('#939393').f('transparent')
            .drawRect(-10, -10, rect.width + 20, rect.height + 20);
    }

    onMoveSelection (event) {
        this.move(event.dx, event.dy);
        this.repaint();
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
            this.repaint();
            DrawingEvent().emit('add', this);
            this.handles.forEach(handle => handle.show());
        } else {
            DrawingEvent().emit('remove', this);
            this.handles.forEach(handle => handle.hide());
        }
    }
}
