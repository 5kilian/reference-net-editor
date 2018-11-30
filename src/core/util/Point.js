
export class Point extends createjs.Point {

    constructor (x, y) {
        super(x, y);
    }

    setPosition (x, y) {
        return this.setValues(x, y);
    }

}
