class ProtobufWriter {
    constructor(data) {
        this.data = data;
        this.buffer = Buffer.alloc(0);
    }
    build(proto) {
        for(const key in this.data) {
            //key could be a number or int
            const subProto = this.getKeys(key, proto);
            subProto.write(this, this.data[key], subProto);
        }
	}
	getKeys(value, proto) {
		const values = Object.values(proto);
		for(const val of values) {
			if(val.name == value || val.field == value) {
				return val;
			}
		}
	}
    concat(buffer) {
        this.buffer = Buffer.concat([this.buffer, buffer]);
    }
    writeVarint(value) {
		value = value.toString(2);
		//split into chunks of 7 long
		let chunks = [];
		for(var i=value.length;i>0;i-=7) {
			chunks.push(value.substring(i-7, i).padStart(7, '0'));
		}
		
		//reverse is handled since we did it backwards already
			
		chunks[chunks.length-1] = '0' + chunks[chunks.length-1]
		if(chunks.length > 1) {
			for(var i=chunks.length-2;i>=0;i--) {
				chunks[i] = '1' + chunks[i];
			}
		}

		const varIntBuffer = Buffer.alloc(chunks.length);
		let index = 0;

		for(const num of chunks) {
			varIntBuffer.writeUInt8(parseInt(num, 2), index++);
		}

		this.buffer = Buffer.concat([this.buffer, varIntBuffer]);
    }
    writeKey(wire, field) {
        wire = wire.toString(2);
		field = field.toString(2);

		while(wire.length < 3) {
			wire = '0' + wire;
		}
		const value = field + wire;
		//split into chunks of 7 long
		let chunks = [];
		for(var i=value.length;i>0;i-=7) {
			chunks.push(value.substring(i-7, i).padStart(7, '0'));
		}
		
		//reverse is handled since we did it backwards already
			
		if(chunks.length > 1) {
			for(var i=0;i<chunks.length;i++) {
				chunks[i] = i == 0 ? '1' + chunks[i] : '0' + chunks[i];
			}
		}

		const buffer = Buffer.alloc(chunks.length);
		let index = 0;
		
		for(const num of chunks) {
			buffer.writeUInt8(parseInt(num, 2), index++);
        }
        
        this.buffer = Buffer.concat([this.buffer, buffer]);
    }
}

module.exports = ProtobufWriter;