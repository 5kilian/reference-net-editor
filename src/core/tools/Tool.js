

export class Tool {

    constructor () {
        this.type = 'tool';
        this.icon = '';
        this.name = '';
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

}
