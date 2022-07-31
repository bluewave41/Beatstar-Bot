const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');

module.exports = {
	1: new Varint('id', 1),
	2: new Varint('type', 2),
	3: new String('rpc', 3),
	7: new String('version', 7),
	11: new Varint('timestamp', 11),
	112: new Group('data', 112, {
		3: new String('id', 3),
		15: new Varint('unknown', 15),
		20: new String('base64', 20)
	})
}