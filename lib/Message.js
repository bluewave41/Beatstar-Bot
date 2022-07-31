class Message {
    constructor() {
        this.data = {};
        this.unknownIndex = 0;
    }
    addField(name, value) {
        if(name == '_') {
            name = 'unknown' + this.unknownIndex++;
        }
        this.data[name] = value;
    }
    finalize() {
        return this.data;
    }
}

module.exports = Message;