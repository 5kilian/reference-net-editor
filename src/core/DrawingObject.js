import Drawing from "./Drawing";

/**
 * abstract
 */
export default class DrawingObject {

    constructor () {
        this.type = 'object';
        this.shape = new createjs.Shape();
        Drawing().add(this);

        let self = this;
        this.shape.on('click', function (event) { self.onClick(event); });
        this.shape.on('dblclick', function (event) { self.onDoubleClick(event); });
        this.shape.on('pressmove', function (event) { self.onPressMove(event); });
        this.shape.on('pressup', function (event) { self.onPressUp(event); });
        this.shape.on('mousedown', function (event) { self.onMouseDown(event); });
        this.shape.on('mouseover', function (event) { self.onMouseOver(event); });
        this.shape.on('mouseout', function (event) { self.onMouseOut(event); });
    }

    /**
     * @abstract
     */
    update () { }

    /**
     * @abstract
     */
    draw () { }

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

    /**
     * @abstract
     */
    onSelect () { }

    /**
     * @abstract
     */
    onDeselect () { }

}
