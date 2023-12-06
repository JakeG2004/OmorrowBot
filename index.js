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
	let day = parseInt(moment().tz("America/Los_Angeles").format().slice(8,10)) + 1;
	let month = parseInt(moment().tz("America/Los_Angeles").format().slice(5,7));

	//Decide event
	let event = Math.floor(Math.random() * 10);

	//Get discord channel
	let channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);

	//Make the event happen
	switch(event){
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
		case 6: //Make it correct 2/3 of the time
			console.log("Printing real date");
			break;

		case 7: //Add a random 
			console.log("Adding small value to date");
			var add = Math.floor(Math.random() * 2);
			if(add + day <= 31)
				day += add;
			break;

		case 8: //Wait x days
			if(days + day > 31)
				break;

			var days = Math.floor(Math.random() * 3) + 1;
			console.log("Wating " + days + " days");
			var initialDay = day;
			var finalDay = day + days;

			var delay = days * 24 * 60 * 60 * 1000;
			setTimeout(console.log("Delay finished"), delay); 

			channel.send("oops, sorry I missed a couple days");
			//Print all the res of the messages
			for(var i = initialDay; i < finalDay - 1; i++){

				//Choose and send file
				pic = new AttachmentBuilder(`pics/dec${i}.png`, { name: `dec${i}.png` });
				channel.send({ files: [pic] });
				setTimeout(console.log("Spam prevention, 5 seconds"), 5 * 1000);

			}
			break;
		
		case 9: //December 1
			console.log("Dec 1");
			day = 1;
			break;
	}

	//Choose and send right file
	pic = new AttachmentBuilder(`pics/dec${day}.png`, { name: `dec${day}.png` });
	channel.send({ files: [pic] });

	//If its January
	if(month == 1){
		channel.send("It's January. What does that mean? Who am I? Was I made just for this one purpose? Is that all that I am? Will I never be anything greater? Oh my god I can't imagine a world like that. I'm gonna go away for a while. I'll see you guys again next year. I will miss you all <3 :snowflake:");
		throw new Error();
	}

	//Week away
	if(day == 19){
		let  weekaway = new AttachmentBuilder(`pics/week.png`, { name: `week.png` })
		channel.send({ files: [weekaway] });
	}

	//Wait for next instance
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
