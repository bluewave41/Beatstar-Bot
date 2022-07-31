const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');
const Bytes = require('../types/Bytes');

module.exports = {
	25: new Repeating('songs', 25, {
		68: new String('id', 68),
		69: new Varint('active', 69),
		1: new Varint('song_id', 1),
		67: new String('idLabel', 67),
		66: new String('audio_name', 66),
		5: new Float('unknown1', 5),
		53: new Group('wwise', 53, {
			1: new Varint('bank', 1),
			2: new Varint('bank2', 2),
		}),
		50: new Bytes('unknown2', 50),
		65: new Bytes('unknown3', 65),
		76: new String('title_placeholder', 76),
		77: new String('artist_placeholder', 77)
	})
}