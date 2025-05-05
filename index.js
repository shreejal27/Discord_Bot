// Import required modules 
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

// Create a new Discord client with message intent 
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent]
});

// Bot is ready 
client.once('ready', () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

// Listen and respond to messages 
client.on('messageCreate', message => {

  // Ignore messages from bots 
  if (message.author.bot) return;

  // Respond to a specific message 
  if (message.content.toLowerCase() === 'hello') {
    message.reply('Hi there! 👋 I am your friendly bot.');
  }

  if (message.content.toLowerCase() === 'who dis?') {
    let count = 0;
    const interval = setInterval(() => {
      if (count >= 10) {
        clearInterval(interval);
        return;
      }
      message.channel.send(`Yo who dis ?`);
      count++;
    }, 500);
  }


  if (message.content.toLowerCase() === 'weather kathmandu') {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=kathmandu&units=metric&appid=" + process.env.WEATHER_TOKEN;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const name = data.name;
        const icon = data.weather[0].icon;
        const description = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const windspeed = data.wind.speed;
        const feelslike = data.main.feels_like;

        message.reply('Weather for: ' + name);
        message.reply('Temperature: ' + temperature + " .C");
        message.reply('Description: ' + description);
        message.reply('Humidity: ' + humidity + " %");
        message.reply('Windspeed: ' + windspeed + " km/hr");
        message.reply('FeelsLike: ' + feelslike + " .C");
      }
      )
  }

});
// Log in to Discord using token from .env 
client.login(process.env.DISCORD_TOKEN); 
