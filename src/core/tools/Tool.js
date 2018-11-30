

export class Tool {

    constructor (stage) {
        this.stage = stage;
    }

    /**
     * @abstract
     */
    onToolEnable (event) { }

    /**
     * @abstract
     */
    onToolDisable (event) { }

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
    onMouseUp (event) { }

    /**
     * @abstract
     */
    onKeyEvent (event) { }

}
