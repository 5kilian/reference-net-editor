import DrawingEvent from './DrawingEvent';
import { Point } from '../util/Point';


/**
 * @abstract
 */
export class DrawingShape extends createjs.Shape {

    constructor () {
        super();
        this.type = this.constructor.name;

        this.globalPoint = new Point();
        this.localPoint = new Point();
        this.centerPoint = new Point();
        this.cornerPoints = {
            NORTHWEST: new Point(),
            NORTHEAST: new Point(),
            SOUTHWEST: new Point(),
            SOUTHEAST: new Point(),
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

    // TODO: rename to setPosition
    updatePosition (x, y) {
        this.x = x;
        this.y = y;
    }

    // TODO: use Geometry
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

    // TODO: find a better name
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

    hitTestGlobal (x, y) {
        this.globalToLocal(x, y, this.globalPoint);
        return this.hitTest(this.globalPoint.x, this.globalPoint.y);
    }

    hitTestLocal (x, y, object) {
        this.localToGlobal(x, y, this.globalPoint);
        return object.hitTestGlobal(this.globalPoint.x, this.globalPoint.y);
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
