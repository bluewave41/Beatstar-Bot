const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');

module.exports = {
	100: new String('version', 100),
	1: new PackedMessage('codes', 1, {
		1: new String('id', 1),
		2: new String('name', 2),
		3: new Varint('idLabel', 3),
		5: new Varint('startTime', 5),
		6: new Varint('endTime', 6),
		7: new Group('reward', 7, {
			1: new PackedMessage('reward', 1, {
				1: new Varint('id', 1),
				2: new Group('reward_type', 2, {
					1: new Varint('unknown1', 1),
					2: new Varint('amount', 2)
				})
			}, { repeating: true })
		}),
		8: new String('url', 8)
	})
}