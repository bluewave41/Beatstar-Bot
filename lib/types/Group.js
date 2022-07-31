const Message = require('../Message');
const ProtobufWriter = require('../ProtobufWriter');

class Group {
    constructor(name, field, fields, options={}) {
		this.name = name;
		this.field = field;
        this.fields = fields;
		this.options = options;
    }
    read(reader, proto, key) {
		if(this.options.repeating) {
			return this.readRepeating(reader, proto, key);
		}
		else {
			return this.readNormal(reader, proto, key);
		}
	}
	readRepeating(reader, proto) {
		const messages = [];
		let topKey;

		while(reader.hasNext()) {
			const message = new Message();
			let key = reader.readVarint(true);
			if(!topKey) {
				topKey = key;
			}
			if(topKey.field != key.field) {
				//repeating are done so this key doesn't belong to it thus why we peek
				return messages;
			}
			key = reader.readVarint();
			const length = reader.readVarint().actual;
			const buffer = reader.slice(reader.index, length);
			while(buffer.hasNext()) {
				const key = buffer.readVarint(true);

				if(proto.fields[key.field]) {
					const v = proto.fields[key.field].read(buffer, proto.fields[key.field], key);
					message.addField(proto.fields[key.field].name, v);
				}
				else {
					const v = buffer.parseUnknown(key);
                    message.addField(key.field, v);
				}
			}
			messages.push(message.finalize());
		}
		
		return messages;
	}
	readNormal(reader, proto) {
		const k = reader.readVarint();
		const length = reader.readVarint().actual;
        const buffer = reader.slice(reader.index, length);
        const message = new Message();

        while(buffer.hasNext()) {
            const key = buffer.readVarint(true);

            if(proto.fields[key.field]) {
				const v = proto.fields[key.field].read(buffer, proto.fields[key.field], key);
				message.addField(proto.fields[key.field].name, v);
            }
            else {
				const v = buffer.parseUnknown(key);
				message.addField(key.field, v);
            }
        }

        return message.finalize();
	}
	write(writer, value, proto) {
		//we don't have the length at the beginning here :(
		//lets use a sub buffer
		
		//proto fields uses numbers
		//value is parsed and uses the name
		if(Array.isArray(value)) {
			this.writeRepeating(writer, value, proto);
			return;
		}

		const subWriter = new ProtobufWriter();

		for(const key in value) {
			const subProto = writer.getKeys(key, proto.fields);
			proto.fields[subProto.field].write(subWriter, value[subProto.name], proto.fields[subProto.field]);
		}

        //now packed is all the packed messages so write to writer

        writer.writeKey(2, this.field);
        writer.writeVarint(subWriter.buffer.length);
        writer.concat(subWriter.buffer);
	}
	writeRepeating(writer, value, proto) {
		const repeatingBuffer = new ProtobufWriter();

		for(const val of value) {
			const subWriter = new ProtobufWriter();
			for(const key in val) {
				const subProto = writer.getKeys(key, proto.fields);
				proto.fields[subProto.field].write(subWriter, val[subProto.name], proto.fields[subProto.field]);
			}
			repeatingBuffer.writeKey(2, this.field);
			repeatingBuffer.writeVarint(subWriter.buffer.length);
            repeatingBuffer.concat(subWriter.buffer);
		}

        //now packed is all the packed messages so write to writer

        //writer.writeKey(2, this.field);
        //writer.writeVarint(repeatingBuffer.buffer.length);
        writer.concat(repeatingBuffer.buffer);
	}
}

module.exports = Group;