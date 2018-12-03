export class Point {

    constructor (x, y) {
        this.setValues(x, y);
    }

    translate (dx, dy) {
        this.setPosition(this.x + dx, this.y + dy);
        return this;
    }

    /**
     * Synonym to setValues
     * @method setPosition
     * @param {Number} [x=0] X position.
     * @param {Number} [y=0] Y position.
     * @return {Point} This instance. Useful for chaining method calls.
     * @chainable
     */
    setPosition (x, y) {
        return this.setValues(x, y);
    }

    /**
     * Sets the specified values on this instance.
     * @method setValues
     * @param {Number} [x=0] X position.
     * @param {Number} [y=0] Y position.
     * @return {Point} This instance. Useful for chaining method calls.
     * @chainable
     */
    setValues (x, y) {
        this.x = x || 0;
        this.y = y || 0;
        return this;
    };

    /**
     * Copies all properties from the specified point to this point.
     * @method copy
     * @param {Point} point The point to copy properties from.
     * @return {Point} This point. Useful for chaining method calls.
     * @chainable
     */
    copy (point) {
        this.x = point.x;
        this.y = point.y;
        return this;
    };

    /**
     * Returns a clone of the Point instance.
     * @method clone
     * @return {Point} a clone of the Point instance.
     **/
    clone () {
        return new Point(this.x, this.y);
    };

    /**
     * Returns a string representation of this object.
     * @method toString
     * @return {String} a string representation of the instance.
     **/
    toString () {
        return '[Point (x=' + this.x + ' y=' + this.y + ')]';
    };

}
