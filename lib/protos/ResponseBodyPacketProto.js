const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');

module.exports = {
	1: new Varint('id', 1),
	2: new Varint('type', 2),
	3: new Varint('response', 3),
	10: new String('unknown1', 10),
	112: new Group('unknown2', 112, {
		1: new String('a', 1),
		2: new String('id', 2),
		3: new Varint('timestamp', 3),
		4: new String('token', 4)
	})
}