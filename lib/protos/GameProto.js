const String = require('../types/String');
const Varint = require('../types/Varint');
const PackedMessage = require('../types/PackedMessage');
const Group = require('../types/Group');
const Float = require('../types/Float');
const Repeating = require('../types/Repeating');

module.exports = {
	/*1000: new String('version'),
	1014: new Group('unknown', {
		3: new Float('unknown')
	}),
	1016: new Group('hashes', {
		10: new String('hash1'),
		13: new String('hash2'),
		14: new String('hash3'),
		15: new String('hash4'),
		16: new String('hash5'),
		17: new String('hash6'),
		18: new String('hash7'),
	}),
	1017: new String('loading_tips', 1017, { repeating: true, key: true }),
	1018: new Group('unknown', {
		33: new String('hash1'),
		85: new String('hash2')
	}),
	1019: new Group('unknown2', {
		2: new Group('unknown', {
			1: new String('hash1'),
			7: new String('hash2'),
			13: new String('hash3'),
			14: new String('hash4'),
			17: new String('hash5'),
			30: new String('hash6'),
			31: new String('hash7'),
			44: new String('hash8'),
			46: new String('hash9'),
			50: new String('hash10'),
			54: new String('hash11'),
			60: new String('hash12'),
			68: new String('hash13'),
			70: new String('hash14'),
			71: new String('hash15'),
			79: new String('hash16'),
			82: new String('hash17'),
			84: new String('hash18'),
			85: new String('hash19'),
			93: new String('hash20'),
			95: new String('hash21'),
			97: new String('hash22'),
			103: new String('hash23'),
			106: new String('hash24'),
			166: new String('hash25'),
			108: new String('hash26'),
			117: new String('hash27'),
			109: new String('hash28'),
			110: new String('hash29'),
			111: new String('hash30'),
			113: new String('hash31'),
			114: new String('hash32'),
			115: new String('hash33'),
			120: new String('hash34'),
			121: new String('hash35'),
			125: new String('hash36'),
			126: new String('hash37'),
			127: new String('hash38'),
			128: new String('hash39'),
			130: new String('hash40'),
			131: new String('hash41'),
			133: new String('hash42'),
			134: new String('hash43'),
			136: new String('hash44'),
			138: new String('hash45'),
			139: new String('hash46'),
			140: new String('hash47'),
			142: new String('hash48'),
			143: new String('hash49'),
			144: new String('hash50'),
			145: new String('hash51'),
			147: new String('hash52'),
			148: new String('hash53'),
			149: new String('hash54'),
			150: new String('hash55'),
			151: new String('hash56'),
			152: new String('hash57'),
			153: new String('hash58'),
			154: new String('hash59'),
			155: new String('hash60'),
			156: new String('hash61'),
			157: new String('hash62'),
			158: new String('hash63'),
			159: new String('hash64'),
			162: new String('hash65'),
			164: new String('hash66'),
			167: new String('hash67'),
			168: new String('hash68'),
			169: new String('hash69'),
			171: new String('hash70'),
			172: new String('hash71'),
			173: new String('hash72'),
			174: new String('hash73'),
			175: new String('hash74'),
			176: new String('hash75'),
			177: new String('hash76'),
			178: new String('hash77'),
			200: new String('hash78'),
			201: new String('hash79'),
			202: new String('hash80'),
			203: new String('hash81'),
			204: new String('hash82'),
			205: new String('hash83'),
			206: new String('hash84'),
			207: new String('hash85'),
			208: new String('hash86'),
			209: new String('hash87'),
			210: new String('hash88'),
			211: new String('hash89'),
			212: new String('hash90'),
			213: new String('hash91'),
			214: new String('hash92'),
			215: new String('hash93'),
			216: new String('hash94'),
			217: new String('hash95'),
			218: new String('hash96'),
			219: new String('hash97'),
			220: new String('hash98'),
			221: new String('hash99')
		})
	}),
	1020: new Group('profile_pics', {
		16: new PackedMessage('profile', {
			1: new String('url'),
			2: new Group('schemas', {
				1: new String('type', 1, { repeating: true }),
				12: new Float('_'),
				14: new Varint('_'),
			})
		}),
		17: new String('facebook_url'),
		18: new Varint('_'),
		19: new Group('ncsi', {
			1: new Varint('_'),
			2: new String('url'),
			3: new Varint('_'),
			4: new Varint('_'),
			6: new Group('_', {
				4: new Varint('_'),
				5: new Varint('_'),
				7: new Varint('_'),
				8: new Varint('_'),
				13: new Float('_')
			}),
			7: new Varint('_'),
			8: new Float('_'),
			9: new Varint('_'),
		}),
		20: new Varint('_'),
		21: new Group('facebook', {
			1: new String('email_bd'),
			2: new String('email_address'),
			3: new String('email_subject'),
			4: new String('email_message'),
			5: new String('deletion_email_body'),
			6: new String('deletion_email_subject'),
		}),
		25: new Group('_', {
			1: new Varint('_'),
			2: new Group('_', {
				1: new Varint('_')
			})
		}),
		26: new Group('_', {
			1: new Varint('_'),
			2: new Group('_', {
				1: new Varint('_'),
				2: new Varint('_'),
			})
		}),
		33: new PackedMessage('schemas', {
			1: new String('_', 1, { repeating: true })
		}),
		54: new PackedMessage('quality', {
			1: new String('setting1'),
			2: new String('setting2')
		}),
		55: new String('drop_rates_url'),
		56: new String('help_portal_link'),
		57: new String('terms_of_service_url'),
		58: new String('privacy_policy_url'),
	}),
	1021: new Group('settings', {
		25: new String('never1'),
		28: new String('hash'),
		20: new String('song_collect_highlight_element'),
		30: new String('username_set'),
		31: new String('never2'),
		33: new String('never3'),
		34: new Varint('_'),
		37: new Varint('_'),
		35: new String('show_ftue_skip'),
		36: new Group('_', {
			1: new Varint('_'),
		}),
		38: new String('unlocked_challenges'),
		39: new String('never4'),
		40: new String('send_full_interaction_type_analytics'),
		41: new String('skippable_song_results'),
		42: new String('unlocked_hub'),
	}),
	1062: new Group('_', {
		1: new Varint('_'),
		2: new Varint('_'),
		3: new Varint('_'),
		4: new Varint('_'),
		5: new Float('_'),
		8: new Varint('_'),
		6: new Group('_', {
			1: new Varint('id'),
			2: new Varint('value')
		}, { repeating: true })
	}),
	1103: new Group('_', {
		1: new Group('_', {
			1: new Varint('_'),
			2: new Varint()
		}),
		17: new Group('_', {
			1: new Varint('_'),
			2: new Varint('_'),
		}),
		23: new Varint('_'),
		5: new String('hash1'),
		6: new String('hash2'),
		7: new String('hash3'),
		8: new String('hash4'),
		9: new String('hash5'),
		13: new String('hash6'),
		14: new String('hash7'),
		15: new String('hash8'),
		16: new String('hash9'),
		18: new String('hash10'),
		24: new String('hash11'),
		22: new String('hash12'),
		25: new String('hash13'),
		30: new Varint('_'),
		31: new Varint('_'),
		33: new Varint('_'),
		34: new Varint('_'),
		36: new Float('_'),
		37: new Float('_'),
		38: new Float('_'),
		49: new Float('_'),
		50: new Float('_'),
		41: new Varint('_'),
		43: new Varint('_'),
		44: new Varint('_'),
		45: new Varint('_'),
		46: new Group('_', {
			2: new PackedMessage('_', {
				1: new Varint('_'),
				2: new Group('_', {
					1: new Varint('_'),
					3: new Varint('_'),
					4: new Varint('_'),
				})
			})
		}),
		47: new Varint('_'),
		48: new Varint('_'),
		51: new Varint('_'),
	}),*/
	3: new Repeating('songs', 3, {
		1: new Varint('id', 1),
		21: new Varint('song_id', 21),
		37: new String('name', 37),
		46: new Varint('chart_id', 46)
	})
}