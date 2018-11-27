import DrawingEvent from './DrawingEvent';


/**
 * @abstract
 */
export class DrawingShape extends createjs.Shape {

    constructor () {
        super();
        this.centerPoint = new createjs.Point();
        this.cornerPoints = {
            NORTHWEST: new createjs.Point(),
            NORTHEAST: new createjs.Point(),
            SOUTHWEST: new createjs.Point(),
            SOUTHEAST: new createjs.Point(),
        };
        this.boundingBox = new createjs.Rectangle();

        this.on('click', this.onClick.bind(this));
        this.on('dblclick', this.onDoubleClick.bind(this));
        this.on('pressup', this.onPressUp.bind(this));
        this.on('pressmove', this.onPressMove.bind(this));
        this.on('mousedown', this.onMouseDown.bind(this));
        this.on('mousemove', this.onMouseMove.bind(this));
        this.on('mouseover', this.onMouseOver.bind(this));
        this.on('mouseout', this.onMouseOut.bind(this));

        DrawingEvent.emit('add', this);
    }

    destructor () {
        DrawingEvent.emit('remove', this);
        delete this;
    }

    /**
     * @abstract
     */
    redraw () { }

    updatePosition (x, y) {
        this.x = x;
        this.y = y;
    }

    distanceTo (x, y) {
        return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow((y - this.y), 2));
    }

    center () {
        let rect = this.rect();
        return this.centerPoint.setValues(
            rect.x + rect.width / 2,
            rect.y + rect.height / 2,
        );
    }

    rect () {
        return this.boundingBox.setValues(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    corners () {
        let rect = this.rect();
        this.cornerPoints.NORTHWEST.setValues(rect.x, rect.y);
        this.cornerPoints.NORTHEAST.setValues(rect.x + rect.width, rect.y);
        this.cornerPoints.SOUTHWEST.setValues(rect.x, rect.y + rect.height);
        this.cornerPoints.SOUTHEAST.setValues(
            rect.x + rect.width,
            rect.y + rect.height
        );
        return this.cornerPoints;
    }

    show () {
        this.visible = true;
        this.onShow();
    }

    hide () {
        this.visible = false;
        this.onHide();
    }

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
    onMouseMove (event) { }

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
    onShow () { }

    /**
     * @abstract
     */
    onHide () { }

}
