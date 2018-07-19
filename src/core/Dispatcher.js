
class Dispatcher {

    constructor () {
        this.events = {};
    }

    addEventListener (name, callback) {
        this.events[name] = callback;
    }

    removeEventListener (name) {
        this.events[name] = undefined;
    }

    emit (event, payload) {
        if (this.events[event]) {
            this.events[event].call(this, payload);
        }
    }

}

let dispatcher = null;

export default function DrawingEvent() {
    if (dispatcher === null) {
        dispatcher = new Dispatcher();
    }
    return dispatcher;
}