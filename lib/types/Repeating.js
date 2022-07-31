const Message = require('../Message');
const ProtobufWriter = require('../ProtobufWriter');

class Repeating {
    constructor(name, field, fields) {
        this.name = name;
        this.field = field;
        this.fields = fields;
    }
    read(values, proto) {
        const messages = [];

        for(const reader of values) {
            const key = reader.readVarint();
            const length = reader.readVarint();
            const message = new Message();

            while(reader.hasNext()) {
                const key = reader.readVarint(true);

				if(proto.fields[key.field]) {
					const v = proto.fields[key.field].read(reader, proto.fields[key.field], key);
					message.addField(proto.fields[key.field].name, v);
				}
				else {
                    const v = reader.parseUnknown(key);
                    message.addField(key.field, v);
				}
            }

            messages.push(message.finalize());
        }

        return messages;
    }
    write(writer, values, proto) {
        for(const val of values) {
            const subWriter = new ProtobufWriter();
            for(const key in val) {
                const subProto = writer.getKeys(key, proto.fields);
                proto.fields[subProto.field].write(subWriter, val[subProto.name], proto.fields[subProto.field]);
            }
        }
    }

        /*for(const val of values) {
            //write the message into a writer
            const subWriter = new ProtobufWriter();
            for(const key in val) {
                const subProto = writer.getKeys(key, proto.fields);
                
            }
            //write size of this message to packed
            packedBuffer.writeVarint(subWriter.buffer.length);
            packedBuffer.concat(subWriter.buffer);
        }

        //now packed is all the packed messages so write to writer

        writer.writeKey(2, this.field);
        writer.writeVarint(packedBuffer.buffer.length);
        writer.concat(packedBuffer.buffer);*/
}

module.exports = Repeating;