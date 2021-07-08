"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_json_1 = require("./config.json");
const dotenv_1 = require("dotenv");
dotenv_1.config();
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client();
client.on('ready', () => {
    console.log('Bot funcionando');
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    console.log(message.content, message.author.username);
    if (message.content.startsWith(`${config_json_1.prefix}ping`)) {
        message.channel.send('pong');
    }
    else if (message.content.startsWith(`${config_json_1.prefix}hueco`)) {
        const member = message.mentions.users.first();
        if (member) {
            message.channel.send(`${member} es hueco`);
            message.delete();
        }
    }
    else if (message.content.startsWith(`${config_json_1.prefix}kick`)) {
        if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(['KICK_MEMBERS'])) {
            const user = message.mentions.users.first();
            if (user) {
                const member = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.member(user);
                if (member) {
                    member.kick('').then(() => {
                        message.reply(`${user.tag} expulsado`);
                    })
                        .catch(err => {
                        message.reply('No pude expulsar al miembro');
                        console.error(err);
                    });
                }
                else {
                    message.reply("¡Ese usuario no está en este gremio!");
                }
            }
            else {
                message.reply("No mencionaste al usuario");
            }
        }
        else if (!((_c = message.member) === null || _c === void 0 ? void 0 : _c.hasPermission(['KICK_MEMBERS']))) {
            message.reply(`No tienes permiso de hacer esto ${message.author.username}`);
        }
    }
}));
client.login(process.env.TOKEN);
