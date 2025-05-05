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
});
// Log in to Discord using token from .env 
client.login(process.env.DISCORD_TOKEN); 
