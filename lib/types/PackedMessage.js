const Message = require('../Message');
const ProtobufWriter = require('../ProtobufWriter');

class PackedMessage {
    constructor(name, field, fields, options={}) {
        this.name = name;
        this.field = field;
        this.fields = fields;
        this.options = options;
    }
    read(reader, proto) {
        if(this.options.repeating) {
            return this.readRepeating(reader, proto);
        }
        else {
            return this.readSingle(reader, proto);
        }
    }
    readRepeating(reader, proto) {
        const messages = [];

        while (reader.hasNext()) {
            const packedKey = reader.readVarint();
            const packedLength = reader.readVarint().actual;
            const packedBuffer = reader.slice(reader.index, packedLength);

            while (packedBuffer.hasNext()) {
                //get message buffer
                const message = new Message();
                const messageLength = packedBuffer.readVarint().actual;
                const messageBuffer = packedBuffer.slice(packedBuffer.index, messageLength);

                while (messageBuffer.hasNext()) {
                    //start reading each packed message
                    const key = messageBuffer.readVarint(true);
                    if (!proto.fields) {
                        const v = messageBuffer.parseUnknown(key);
                        message[key.field] = v;
                    }
                    else if (proto.fields[key.field]) {
                        const v = proto.fields[key.field].read(messageBuffer, proto.fields[key.field], key);
                        message.addField(proto.fields[key.field].name, v);
                    }
                }
                messages.push(message.finalize());
            }
        }

        return messages;
    }
    readSingle(reader, proto) {
        const messages = [];

        const packedKey = reader.readVarint();
        const packedLength = reader.readVarint().actual;
        const packedBuffer = reader.slice(reader.index, packedLength);

        while (packedBuffer.hasNext()) {
            //get message buffer
            const message = new Message();
            const messageLength = packedBuffer.readVarint().actual;
            const messageBuffer = packedBuffer.slice(packedBuffer.index, messageLength);

            while (messageBuffer.hasNext()) {
                //start reading each packed message
                const key = messageBuffer.readVarint(true);
                if (!proto.fields[key.field]) {
                    const v = messageBuffer.parseUnknown(key);
                    message.addField(key.field, v);
                }
                else if (proto.fields[key.field]) {
                    const v = proto.fields[key.field].read(messageBuffer, proto.fields[key.field], key);
                    message.addField(proto.fields[key.field].name, v);
                }
            }
            messages.push(message.finalize());
        }

        return messages;
    }
    write(writer, values, proto) {
        //we don't have the length at the beginning here :(
        //lets use a sub buffer
        const packedBuffer = new ProtobufWriter();

        for(const val of values) {
            //write the message into a writer
            const subWriter = new ProtobufWriter();
            for(const key in val) {
                const subProto = writer.getKeys(key, proto.fields);
                proto.fields[subProto.field].write(subWriter, val[subProto.name], proto.fields[subProto.field]);
            }
            //write size of this message to packed
            packedBuffer.writeVarint(subWriter.buffer.length);
            packedBuffer.concat(subWriter.buffer);
        }

        //now packed is all the packed messages so write to writer

        writer.writeKey(2, this.field);
        writer.writeVarint(packedBuffer.buffer.length);
        writer.concat(packedBuffer.buffer);
    }
}

module.exports = PackedMessage;