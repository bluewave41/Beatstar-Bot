const ProtobufWriter = require('../ProtobufWriter');

class String {
	constructor(name, field, options = {}) {
		this.name = name;
		this.field = field;
		this.options = options;
	}
	read(reader, proto) {
		let length;

		if(this.options.repeating) {
			if(this.options.key) {
				return this.readRepeatingWithKey(reader, proto);
			}
			else {
				return this.readRepeatingWithLength(reader, proto);
			}
		}

		const key = reader.readVarint();
		length = reader.readVarint().actual;
		const str = reader.slice(reader.index, length).toString();
		return str;
	}
	write(writer, value, proto) {
		if(this.options.repeating) {
			//this buffer will contain the strings and lengths
			const subBuffer = new ProtobufWriter();
			for(const str of value) {
				subBuffer.writeVarint(str.length);
				subBuffer.concat(Buffer.from(str));
			}

			writer.writeKey(2, proto.field);
			writer.writeVarint(subBuffer.buffer.length);
			writer.concat(subBuffer.buffer);
		}
		else {
			const buffer = Buffer.from(value);
			//write key
			writer.writeKey(2, proto.field);
			//write length as varint
			writer.writeVarint(buffer.length);
			//write string
			writer.concat(buffer);
		}
	}
	readRepeatingWithKey(reader, proto) {
		let strs = [];
		let length;

		while (reader.hasNext()) {
			const key = reader.readVarint();
			length = reader.readVarint().actual; //full length of repeating segmment
			const repeatingBuffer = reader.slice(reader.index, length);

			while (repeatingBuffer.hasNext()) {
				repeatingBuffer.readVarint(); //repeating key
				length = repeatingBuffer.readVarint().actual;
				strs.push(repeatingBuffer.slice(repeatingBuffer.index, length).data.toString());
			}
		}
		return strs;
	}
	readRepeatingWithLength(reader, proto) {
		let strs = [];
		let length;

		while (reader.hasNext()) {
			const key = reader.readVarint();
			length = reader.readVarint().actual; //full length of repeating segmment
			const repeatingBuffer = reader.slice(reader.index, length);

			while (repeatingBuffer.hasNext()) {
				length = repeatingBuffer.readVarint().actual;
				strs.push(repeatingBuffer.slice(repeatingBuffer.index, length).data.toString());
			}
		}
		return strs;
	}
}

module.exports = String;