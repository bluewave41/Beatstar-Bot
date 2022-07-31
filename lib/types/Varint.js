class Varint {
	constructor(name, field, options={}) {
		this.name = name;
		this.field = field;
		this.options = options;
	}
	read(reader, proto) {	
		const varints = [];
		if(!reader.data) {
			return reader;
		}

		if(this.options.repeating) {
			if(!this.options.key) {
				return this.readRepeatingWithoutKey(reader, proto);
			}
		}

		const key = reader.readVarint();
		
		if(this.options.repeating) {
			while(reader.hasNext()) {
				varints.push(reader.readVarint().actual);
				if(!reader.hasNext()) {
					return varints;
				}
				const key = reader.readVarint();
			}
		}
		
		const val = reader.readVarint().actual;
		return val;
	}
	readRepeatingWithoutKey(reader, proto) {
		const varints = [];
		while(reader.hasNext()) {
			varints.push(reader.readVarint().actual);
		}
		return varints;
	}
	write(writer, value, proto) {
		if(Array.isArray(value)) {
			return this.writeRepeating(writer, value, proto);
		}
		writer.writeKey(0, proto.field);
		writer.writeVarint(value);
	}
	writeRepeating(writer, values, proto) {
		for(const val of values) {
			writer.writeKey(0, proto.field);
			writer.writeVarint(val);
		}
	}
}

module.exports = Varint;