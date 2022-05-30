const BufferedReader = require('../lib/BufferedReader');
const tls = require('tls');
const fs = require('fs');
const zlib = require('zlib');
const { MessageEmbed } = require('discord.js');

async function run() {
	return new Promise(function(resolve, reject) {
			const socket = tls.connect(443, 'socket-gateway.prod.flamingo.apelabs.net', function() {
			const packet2 = fs.readFileSync('./2.json');
			socket.write(packet2);
		})

		socket.on('data', function(data) {
			const reader = new BufferedReader(data);
			let info = {};
			let save = {};
			let updated = [];
			const local = JSON.parse(fs.readFileSync('links.json').toString());
			reader.skip(19);
			const str = reader.readString();
			reader.readByte();
			
			let zipped = reader.slice(reader.data.length - reader.position);
			zlib.gunzip(zipped, function(err, buf) {
				const configReader = new BufferedReader(buf);
				configReader.skip(23);
				try {
					while(configReader.hasNext()) {
						const configFileName = configReader.readString();
						console.log(configFileName)
						const version = configReader.readString();
						info[configFileName] = {
							version: version,
							hash: configReader.readString(),
							diffs: configReader.readString(),
							url: configReader.readString()
						}
						save[configFileName] = version;
						configReader.skip(3);
					}
				}
				catch(e) {
					//send info and cleanup
					fs.writeFileSync('links.json', JSON.stringify(save));
					let str = '';
					socket.destroy();
					
					const keys = Object.keys(info);
					for(const key of keys) {
						if(local[key] != info[key].version) {
							updated.push(key);
						}
						str += key + ': ' + info[key].url + '\n';
					}
					
					if(updated.length) {
						str = '**UPDATED: **' + updated.join(',') + '\n' + str;
					}

					const exampleEmbed = new MessageEmbed()
						.setColor('#0099ff')
						.setTitle('Assets')
						.setDescription(str)
					console.log(str);
						
					resolve(exampleEmbed);
				}
			})
		})
	})

}

module.exports = run;