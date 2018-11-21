
class DrawingEvent {

    constructor () {
        this.events = {};
    }

    on (name, callback) {
        if (!this.events[name]) {
            this.events[name] = [];
        }
        this.events[name].push(callback);
    }

    off (name, callback) {
        this.events[name].remove(callback);
    }

    emit (name, payload) {
        if (this.events[name]) {
            this.events[name].forEach(event => event.call(this, payload));
        }
    }

}

export default new DrawingEvent();
