const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');

module.exports = {
    1: new Varint('id', 1),
    2: new String('version', 2),
    3: new Varint('timestamp', 3),
    4: new String('empty', 4),
    5: new Group('cms', 5, {
        1: new Varint('id', 1),
        2: new String('empty', 2),
        3: new Varint('unknown', 3),
        4: new Group('thing', 4, {
            1: new Group('cms', 1, {
                1: new String('url', 1),
                2: new String('version', 2),
                3: new String('hash', 3),
                7: new String('language', 7)
            }, { repeating: true })
        })
    })
}