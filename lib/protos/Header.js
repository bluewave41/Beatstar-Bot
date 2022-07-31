const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');

module.exports = {
	1: new String('version', 1),
	2: new String('service', 2),
	3: new String('rpc', 3),
	4: new String('base64', 4),
	6: new Varint('thing', 6),
	7: new Varint('thing2', 7),
	9: new String('id', 9)
}