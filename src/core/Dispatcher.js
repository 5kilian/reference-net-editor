
class Dispatcher {

    constructor () {
        this.events = {};
    }

    addEventListener (name, callback) {
        if (!this.events[name]) {
            this.events[name] = [];
        }
        this.events[name].push(callback);
    }

    removeEventListener (name, callback) {
        this.events[name].remove(callback);
    }

    emit (name, payload) {
        if (this.events[name]) {
            this.events[name].forEach(event => event.call(this, payload));
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