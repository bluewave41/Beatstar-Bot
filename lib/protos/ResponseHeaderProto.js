const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');

module.exports = {
	1: new Varint('id', 1),
	2: new Varint('timestamp', 2),
	3: new String('rpc', 3),
}