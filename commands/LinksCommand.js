const tls = require('tls');
const fs = require('fs');
const zlib = require('zlib');
const ProtobufWriter = require('../lib/ProtobufWriter');
const LoginPacketProto = require('../lib/protos/LoginPacketProto');
const ProtobufReader = require('../lib/ProtobufReader');
const Header = require('../lib/protos/Header');
const ResponseHeaderProto = require('../lib/protos/ResponseHeaderProto');
const ResponseBodyPacketProto = require('../lib/protos/ResponseBodyPacketProto');
const CMSRequestProto = require('../lib/protos/CMSRequestProto');
const CMSResponseProto = require('../lib/protos/CMSResponseProto');
const { v4: uuidv4 } = require('uuid');

const { MessageEmbed } = require('discord.js');

function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}
	
function getRandomRpc(index) {
	return `rpc-${index}-${getRandomArbitrary(100000, 999999)}`;
}

function buildPacket(header, body, headerProto, bodyProto) {
	const writer = new ProtobufWriter(header);
	writer.build(headerProto);

	const writer2 = new ProtobufWriter(body);
	writer2.build(bodyProto);

	const combined = Buffer.concat([writer.buffer, writer2.buffer]);

	let buffer = Buffer.alloc(8);
	buffer.writeInt32BE(combined.length + 4, 0);
	buffer.writeInt32BE(writer.buffer.length, 4);

	buffer = Buffer.concat([buffer, combined]);
	
	return buffer;
}

async function parseResponse(response, headerProto, bodyProto) {
	const reader = new ProtobufReader(response);
	const blocks = await reader.processHeaderPacket();
	
	const header = blocks[0].parseProto(headerProto);
	const body = blocks[1].parseProto(bodyProto);
	
	return {
		header,
		body
	}
}

function writePacket(socket, packet) {
	return new Promise((resolve, reject) => {
		const get = (data) => {
			socket.off('data', get);
			resolve(data);
		}
	
		socket.once('data', get);
		socket.write(packet);
	})
}

async function run() {
	const socket = tls.connect(443, 'socket-gateway.prod.flamingo.apelabs.net');
	let header = {
		version: '999.9.9.9999',
		service: 'userservice',
		rpc: getRandomRpc(1),
		thing: 1,
		thing2: 2
	}
	
	const body = {
		id: 1,
		type: 7,
		version: '999.9.9.99999',
		timestamp: Date.now(),
		data: {
			id: uuidv4(),
			unknown: 1
		}
	}
	
	const cmsRequest = {
	  "id": 2,
	  "version": "999.9.9.99999",
	  "timestamp": Date.now(),
	  "empty": "",
	  "cms": {
		"id": 1,
		"empty": "",
		"unknown": 1,
		"thing": {
		  "cms": [
			{
			  "url": "GameConfig",
			},
			{
			  "url": "LangConfig",
			  "language": "en"
			},
			{
			  "url": "AssetsPatchConfig",
			},
			{
			  "url": "AudioConfig",
			},
			{
			  "url": "NewsFeed",
			  "language": "en"
			},
			{
			  "url": "ScalingConfig",
			},
			{
			  "url": "NotificationConfig",
			},
			{
			  "url": "FontFallbackConfig",
			},
			{
			  "url": "LiveOpsBundleConfig",
			  "language": "en"
			},
			{
			  "url": "LiveOpsEventConfig",
			  "language": "en"
			},
			{
			  "url": "LiveOpsDeeplinkRewardConfig",
			}
		  ]
		}
	  }
	}

	let response = await writePacket(socket, buildPacket(header, body, Header, LoginPacketProto));
	let info = await parseResponse(response, ResponseHeaderProto, ResponseBodyPacketProto);
	header.base64 = info.body.unknown2.a;
	header.id = info.body.unknown1;
	header.service = 'cmsservice';
	header.rpc = getRandomRpc(2);
	
	response = await writePacket(socket, buildPacket(header, cmsRequest, Header, CMSRequestProto));
	info = await parseResponse(response, ResponseHeaderProto, CMSResponseProto);
	
	socket.end();
	
	const cms = info.body.cms.cms.cms;
	const data = JSON.parse(await fs.readFileSync('links.txt').toString());
	const now = new Date().toISOString().substring(0,10);
	const save = {}
	const updated = [];

	let str = '';
	for(const link of cms) {
		if(link.version != data[link.name]?.version) {
			//updated
			updated.push(link.name);
			str += `*${now}* - `+ `**${link.name}**` + ': ' + link.url + '\n';
			save[link.name] = {
				version: link.version,
				date: now
			}
		}
		else {
			str += `*${data[link.name].date}* - `+ `**${link.name}**` + ': ' + link.url + '\n';
			save[link.name] = {
				version: link.version,
				date: data[link.name].date
			}
		}
	}
	
	if(updated.length) {
		str = 'UPDATED: ' + updated.join('\n') + '\n\n' + str;
		fs.writeFileSync('links.txt', JSON.stringify(save));
	}
	
	const exampleEmbed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Assets')
		.setDescription(str)

	return exampleEmbed;
}

module.exports = run;