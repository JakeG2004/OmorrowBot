//Prerequisites
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { token, guildId, channelId } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

//Libraries
var moment = require('moment-timezone');
var cron = require("cron");

function sendMessage(){
	//Get date
	let add = Math.floor(Math.random() * 2);
	let day = parseInt(moment().tz("America/Los_Angeles").format().slice(8,10)) + 1;

	if(add + day <= 31){
		day += add;
	}

	let month = parseInt(moment().tz("America/Los_Angeles").format().slice(5,7));

	//Get discord channel
	let channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);
	
	//If its January
	if(month == 01){
		channel.send("It's January. What does that mean? Who am I? Was I made just for this one purpose? Is that all that I am? Will I never be anything greater? Oh my god I can't imagine a world like that. I'm gonna go away for a while. I'll see you guys again next year. I will miss you all <3 :snowflake:");
		throw new Error();
	}

	//Week away
	if(day == 19){
		let  weekaway = new AttachmentBuilder(`pics/week.png`, { name: `week.png` })
		channel.send({ files: [weekaway] });
	}

	//Choose and send file
	let pic = new AttachmentBuilder(`pics/dec${day}.png`, { name: `dec${day}.png` })
	channel.send({ files: [pic] });

	//Send message at random time
	let min = 90 * 60;
	let max = 720 * 60;
	let rand = Math.floor(Math.random() * (max - min + 1) + min);
	console.log('waiting ' + rand / 60 + ' minutes');
	setTimeout(sendMessage, rand * 1000);
}

client.on(Events.ClientReady, async () => {
	
  //login notif
  let channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);
  console.log(`Logged in as ${client.user.tag}!`);

  //channel.send("I'm sorry. It will happen again.");
  sendMessage();
});

client.login(token);
