class Bytes {
	constructor(name, field) {
		this.name = name;
		this.field = field;
	}
	read(reader, proto) {
        const key = reader.readVarint();
        const length = reader.readVarint().actual;
        return reader.slice(reader.index, length).data;
	}

	write(writer, value, proto) {
		writer.writeKey(5, proto.field);

		const buffer = Buffer.alloc(4);
		buffer.writeFloatLE(value);

		writer.concat(buffer);
	}
}

module.exports = Bytes;