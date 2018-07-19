

export default class Tool {

    constructor () {
        this.type = 'tool';
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
