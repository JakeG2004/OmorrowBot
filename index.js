//Prerequisites
const fs = require('fs');
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits, AttachmentBuilder, EmbedBuilder } = require('discord.js');
const { token, guildId, channelId } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

//Libraries
var moment = require('moment-timezone');

function sendMessage(){
	//Get date
	let day = parseInt(moment().tz("America/Los_Angeles").format().slice(8,10)) + 1;
	let month = parseInt(moment().tz("America/Los_Angeles").format().slice(5,7));

	//Decide event
	let event = Math.floor(Math.random() * 10);

	//Get discord channel
	let channel = client.guilds.cache.get(guildId).channels.cache.get(channelId);

	//event = 8;

	//Make the event happen
	switch(event){
		case 0: //Print n times
			console.log("Printing n times");
			let times = Math.floor(Math.random() * 3) + 2;

			for(var i = 0; i < times; i++){

				//Choose and send file
				pic = new AttachmentBuilder(`pics/dec${day}.png`, { name: `dec${day}.png` });
				channel.send({ files: [pic] });
				setTimeout(console.log, 5 * 1000, "Spam prevention, 5 seconds");
			}

			break;
			
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
			var days = Math.floor(Math.random() * 3) + 2;

			if(days + day > 31){
				console.log("Printing real date");
				break;
			}
			
			console.log("Wating " + days + " days");
			var initialDay = day;
			var finalDay = day + days;

			var delay = days * 24 * 60 * 60 * 1000;

			setTimeout(function(){
				console.log('Delay finished');
				channel.send("oops, sorry I missed a couple days");
				//Print all the res of the messages
				for(var i = initialDay; i < finalDay - 1; i++){
	
					//Choose and send file
					pic = new AttachmentBuilder(`pics/dec${i}.png`, { name: `dec${i}.png` });
					channel.send({ files: [pic] });
	
				}
			}, delay);
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

	//If it's the 31st
	var msg = "";
	if(day == 32){
		switch(Math.floor(Math.random() * 5)){
			case 0:
				msg = "Oh no... I feel my end is coming near. HELP ME!!!!";
				break;
			case 1:
				msg  = "nonononononono this can't be happening. I'm scared";
				break;
			case 2:
				msg = "This can't be it. PLEASE!!!";
				break;
			case 3:
				msg = "AAAAAAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH";
				break;
			case 4:
				msg = "What kind of world do I live in where my end is in mere hours? I don't want to go!";
				break;
		}
		channel.send(msg);
	}

	//Week away
	if(day == 19){
		let  weekaway = new AttachmentBuilder(`pics/week.png`, { name: `week.png` })
		channel.send({ files: [weekaway] });
	}

	// NathansXmas array
	NathansXmas = [
		"https://www.youtube.com/watch?v=e_h4BptGyLw",
		"https://www.youtube.com/watch?v=PAQjJneT6jY",
		"https://www.youtube.com/watch?v=7AQQkXoU2gY",
		"https://www.youtube.com/watch?v=hAGQx5GJde4",
		"https://www.youtube.com/watch?v=-CNwtE3tUxY"
	];

	// Number of days in the NathansXmas array
	let n = NathansXmas.length;

	// Calculate the start day dynamically
	let startDay = 25 - n;

	// Nathans Xmas dynamic special
	if (day >= startDay && day < 25) {
		message = NathansXmas[day - startDay];
		channel.send(message);
	}

	//Wait for next instance
	let min = 90 * 60;
	let max = 360 * 60;
	let rand = Math.floor(Math.random() * (max - min + 1) + min);
	console.log('waiting ' + rand / 60 + ' minutes');
	setTimeout(sendMessage, rand * 1000);
}

client.on(Events.ClientReady, async () => {
	
  //login notif
  console.log(`Logged in as ${client.user.tag}!`);

  //channel.send("I'm sorry. It will happen again.");
  sendMessage();
});

client.login(token);
