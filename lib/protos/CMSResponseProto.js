const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');

module.exports = {
	1: new Varint('id', 1),
	2: new Varint('timestamp', 2),
	4: new String('a', 4),
	5: new Group('cms', 5, {
		1: new Varint('unknown1', 1),
		2: new Varint('unknown2', 2),
		3: new Varint('unknown3', 3),
		5: new Group('cms', 5, {
			1: new Group('cms', 1, {
				1: new String('name', 1),
				2: new String('version', 2),
				3: new String('hash', 3),
				4: new String('diffs', 4),
				5: new String('url', 5)
			}, { repeating: true }),
			2: new Group('ads', 2, {
				1: new String('a', 1),
				2: new String('b', 2)
			})
		})
	})
}