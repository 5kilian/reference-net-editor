

export default class Tool {

    constructor () {
        this.icon = '';
        this.name = '';
    }

    draw () {

    }

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
