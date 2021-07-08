import {prefix} from './config.json'
import {config} from'dotenv'
config();
import {Client, Message } from 'discord.js'
const client : Client = new Client();


client.on('ready', () =>{
    console.log('Bot funcionando');
});

client.on('message',async (message:Message) => {
    console.log(message.content, message.author.username);

    if (message.content.startsWith(`${prefix}ping`)) {
        message.channel.send('pong');
    }
    else if (message.content.startsWith(`${prefix}hueco`)) {
        const member =  message.mentions.users.first();
        if (member) {
           message.channel.send(`${member} es hueco`);
            message.delete();
        } 
    }
    else if (message.content.startsWith(`${prefix}kick`)) {
        if (message.member?.hasPermission(['KICK_MEMBERS'])){
        const user = message.mentions.users.first();
        if (user) {
          const member = message.guild?.member(user);
          if (member) {
              member.kick('').then(() => {
                message.reply(`${user.tag} expulsado`);
              })
              .catch(err => {
                message.reply('No pude expulsar al miembro');
                console.error(err);
              });
          } else {
            message.reply("¡Ese usuario no está en este gremio!");
          }
        } else {
          message.reply("No mencionaste al usuario");
        }}
    else if (!(message.member?.hasPermission(['KICK_MEMBERS']))){
        message.reply(`No tienes permiso de hacer esto ${message.author.username}`)
    }
    }
    });

client.login(process.env.TOKEN);