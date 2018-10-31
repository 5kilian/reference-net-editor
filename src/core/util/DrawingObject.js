import Canvas from "./Canvas";

/**
 * abstract
 */
export default class DrawingObject extends createjs.Shape {

    constructor () {
        super();
        this.type = 'object';

        let self = this;
        this.on('click', event => self.onClick(event));
        this.on('dblclick', event => self.onDoubleClick(event));
        this.on('pressmove', event => self.onPressMove(event));
        this.on('pressup', event => self.onPressUp(event));
        this.on('mousedown', event => self.onMouseDown(event));
        this.on('mouseover', event => self.onMouseOver(event));
        this.on('mouseout', event => self.onMouseOut(event));
    }

    draw (context) {
        super.draw(context);
    }

    updatePosition (x, y) {
        this.x = x;
        this.y = y;
    }

    adjustScale (dx, dy) { }

    /**
     * @abstract
     */
    update () { }

    /**
     * @abstract
     */
    onClick (event) { }

    /**
     * @abstract
     */
    onDoubleClick (event) { }

    /**
     * @abstract
     */
    onPressMove (event) { }

    /**
     * @abstract
     */
    onPressUp (event) { }

    /**
     * @abstract
     */
    onMouseDown (event) { }

    /**
     * @abstract
     */
    onMouseOver (event) { }

    /**
     * @abstract
     */
    onMouseOut (event) { }

}
