import { KEYCODE_DEL } from '../constants/KeyCodes';

export default class Selection {

    constructor () {
        this.shape = new createjs.Shape();
        this.objects = [];
        this.changed = false;
    }

    toggle (object) {
        if (this.contains(object)) {
            this.remove(object);
        } else {
            this.add(object);
        }
    }

    add (object) {
        this.objects.push(object);
        object.onSelect();
        this.changed = true;
        this.draw();
    }

    move (dx, dy) {
        this.objects.forEach((object) => object.move(dx, dy));
    }

    remove (object) {
        if (this.contains(object)) {
            this.objects.splice(this.objects.indexOf(object), 1);
            object.onDeselect();
            this.changed = true;
        }
    }

    count () {
        return this.objects.length;
    }

    contains (object) {
        return this.objects.includes(object);
    }

    clear () {
        this.objects.forEach((object) => object.onDeselect());
        this.objects = [];
        this.changed = true;
    }

    handleKeyEvent (keys, event) {
        switch (keys[ keys.length - 1 ]) {
            case KEYCODE_DEL:
                this.objects.forEach((object) => object.remove());
                this.clear();
                break;
            default:
        }
    }

    rect () {
        let rect = this.objects[0].rect();
        for (let i=1; i<this.objects.length; i++) {
            // rect
        }
        return rect;
    }

    draw () {
        let rect = this.rect();
        console.log(rect);

        this.shape.graphics.clear().s('#939393').f('transparent')
            .drawRect(0, 0, rect.width, rect.height);
    }
}
