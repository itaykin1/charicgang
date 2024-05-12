"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_2 = require("discord.js");
const { EmbedBuilder, WebhookClient, } = require('discord.js');
const TOKEN = "MTIwNDQ1MjU1ODI3NDU2ODIxMg.G6J6Kd.4sjG3F55HoH3o9pi1aLOHNXzKTGApzbcKb6R5M";
console.log("Bot is starting...");
const client = new discord_js_2.Client({
    intents: ["Guilds", "GuildMessages", "MessageContent", "GuildModeration", "GuildMembers", "GuildVoiceStates", "GuildPresences"]
});
client.login(TOKEN);

client.on('ready', (c) => {
    console.log(`logging in ${client.user.displayName}`);
    client.user?.setActivity({
        name: `${client.guilds.cache.get("1169524744354275350")?.memberCount} members in server`,
        type: discord_js_2.ActivityType.Watching
    });
});
client.on('guildMemberAdd', (member) => {
    client.user?.setActivity(`${client.guilds.cache.get("1169524744354275350")?.memberCount} members in server`);
});
client.on('guildMemberRemove', (members) => {
    client.user?.setActivity(`${client.guilds.cache.get("1169524744354275350")?.memberCount} members in server`);
});

const authorizedUserIds = ['894223930963939379', '778142814164484146'];
const prefix = ".";

client.on('messageCreate', async (message) => {
    if (!message.content)
        return;
    if (message.content.startsWith('.notvoice') && !message.author.bot) {
        const allowedUserIds = ['894223930963939379', '778142814164484146'];
        if (!allowedUserIds.includes(message.author.id)) {
            await message.channel.send('You do not have permission to use this command.');
            return;
        }
        const args = message.content.split(' ');
        if (args.length < 2) {
            await message.channel.send('Please provide a role ID.');
            return;
        }
        const roleId = args[1];
        const role = message.guild?.roles.cache.get(roleId);
        if (!role) {
            await message.channel.send('Role not found.');
            return;
        }
        const voiceChannel = message.member?.voice.channel;
        if (!voiceChannel) {
            await message.channel.send('You are not in a voice channel.');
            return;
        }
        const membersWithRoleNotInVoice = role.members.filter(member => member.voice.channelId !== voiceChannel.id);
        const mentions = membersWithRoleNotInVoice.map(member => member.toString()).join(' ');
        if (mentions) {
            await message.channel.send(`Members with the role not in your voice channel: ${mentions}`);
        }
        else {
            await message.channel.send('כל האנשים עם הרול בשיחה שלך');
        }
    }
});
client.on('messageCreate', async (message) => {

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift()?.toLowerCase();
        if (command === 'muteall' || command === 'unmuteall') {
            if (!authorizedUserIds.includes(message.author.id)) {
                message.reply('You are not authorized to use this command.');
                return;
            }
            if (message.member.voice.channel) {
                const voiceChannel = message.member.voice.channel;
                const mute = command === 'muteall';
                voiceChannel.members.forEach((member) => {
                    if (!member.user.bot) {
                        member.voice.setMute(mute).catch((error) => {
                            console.error(`Error ${mute ? 'muting' : 'unmuting'} ${member.user.tag}:`, error);
                        });
                    }
                });
                message.reply(`${mute ? 'Muted' : 'Unmuted'} all members in ${voiceChannel}.`);
            }
            else {
                message.reply('You need to be in a voice channel to use this command.');
            }
        }
    }
});

client.on('messageCreate', async (message) => {

  if (message.content.startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift()?.toLowerCase();
      if (command === 'ma' || command === 'um') {
          if (!authorizedUserIds.includes(message.author.id)) {
              message.reply('You are not authorized to use this command.');
              return;
          }
          if (message.member.voice.channel) {
              const voiceChannel = message.member.voice.channel;
              const mute = command === 'ma';
              voiceChannel.members.forEach((member) => {
                  if (!member.user.bot) {
                      member.voice.setMute(mute).catch((error) => {
                          console.error(`Error ${mute ? 'muting' : 'unmuting'} ${member.user.tag}:`, error);
                      });
                  }
              });
              message.reply(`${mute ? 'Muted' : 'Unmuted'} all members in ${voiceChannel}.`);
          }
          else {
              message.reply('You need to be in a voice channel to use this command.');
          }
      }
  }
});

const messageblacklist = ['696027515654897714'];
let cooldownTimestamp = null; // Global cooldown timestamp

client.on('voiceStateUpdate', (oldState, newState) => {


  if (messageblacklist.includes(newState.member.id)) return;

  const channelIdToMonitor = '1169524745583202341';
  const channelIdToSendMessage = '1169524745583202336';
  const cooldownTime = 5 * 60 * 1000; // 5 minutes in milliseconds

  if (oldState.channel?.name === undefined) {
    if (newState.channel && newState.channel.id === channelIdToMonitor) {
      if (newState.channel.members.size === 1 || oldState.channel?.name !== undefined) {
        const textChannel = client.channels.cache.get(channelIdToSendMessage);

        if (textChannel instanceof discord_js_1.TextChannel) {
          // Check for global cooldown
          if (cooldownTimestamp && Date.now() - cooldownTimestamp < cooldownTime) {
            const remainingTime = Math.floor((cooldownTimestamp + cooldownTime - Date.now()) / 1000); // Remaining time in seconds
            textChannel.send(` מזדיין חכה קצת אם אף אחד לא נכנס כנראה שאף אחד לא רוצה אותך ${newState.member}\n זמן לחכות ${remainingTime} שניות`);
            return;
          }

          // Send message and update cooldown
          textChannel.send(` https://discord.com/channels/1169524744354275350/1169524745583202341 כנסו לשיחה \n ${newState.member} רוצה אותכם: \n <@&1209882979309195398> `);
          cooldownTimestamp = Date.now();
        }
      }
    }
  }
});



  const tPerms = [
    '824918495439487017',
    '894223930963939379',
  ];
  
  // Channel ID for logging timeouts

  


  const maxTimeoutInMilliseconds = 28 * 24 * 60 * 60 * 1000; // 28 days in milliseconds

  client.on('messageCreate', async (message) => {
    if (!message.content.startsWith('.t')) return; // Only respond to messages starting with "!timeout"
    if (!tPerms.includes(message.author.id)) return; // Only allow authorized users
  
    const mentionedMember = message.mentions.members.first();
    if (!mentionedMember) {
      return message.channel.send('בבקשה תתייג בן אדם כדי להשתמש בפקודה');
    }
  
    const duration = message.content.split(' ').slice(2).join(' '); // Get timeout duration from remaining message content
    if (!duration) {
      return message.channel.send('( 1m for 1 minute, 1h for 1 hour, 1d for 1 day, 1w for 1 week, 1s for 1 second) בבקשה תבחר זמן הגיוני כדי לשים לו טיים אוט ');
    }
  
    const timeoutInMilliseconds = convertDurationToMilliseconds(duration);
    if (timeoutInMilliseconds <= 0) {
      return message.channel.send('בחרת זמן לא תקין');
    }
  
    if (timeoutInMilliseconds > maxTimeoutInMilliseconds) {
      return message.channel.send(`המקסימום כדי לשים טיים אוט הוא 27 ימים, בבקשה תבחר זמן יותר קטן `);
    }
  
    try {
      await mentionedMember.timeout(timeoutInMilliseconds);
      message.channel.send(`${duration} קיבל בהצלחה טיים אוט לזמן של ${mentionedMember.user.tag} `);

    } catch (error) {
      console.error('Error timing out user:', error);
      message.channel.send('An error occurred while timing out the user. Please check bot permissions and try again.');
    }
  });
  
  function convertDurationToMilliseconds(duration) {
    const timeUnit = duration.slice(-1).toLowerCase();
    const timeValue = parseInt(duration.slice(0, -1));
  
    switch (timeUnit) {
      case 'm':
        return timeValue * 60 * 1000;
      case 'h':
        return timeValue * 60 * 60 * 1000;
      case 'd':
        return timeValue * 24 * 60 * 60 * 1000;
      case 'w':
        return timeValue * 7 * 24 * 60 * 60 * 1000;
      case 's':
        return timeValue * 1000;
      default:
        return 0; // Invalid unit, return 0 milliseconds
    }
  }
  
  client.on('messageCreate', async (message) => {
 
    if (message.content.startsWith('.purge')) {
      // Check for permissions
      if (!message.member?.permissions.has('Administrator') && message.author.id !== '894223930963939379') {
        return message.reply('אין לך גישה להשתמש בפקודה זאת ');
      }
  
      const amount = parseInt(message.content.split(' ')[1]);
  
      // Input validation (optional, adjust limits as needed)
      if (isNaN(amount) || amount < 1 || amount > 99) {
        return message.reply('בבקשה תבחר מספר בין 99 -1 הודעות למחיקה');
      }
  
      try {
        const fetched = await message.channel.messages.fetch({ limit: amount + 1 });
  
        // Filter out the command message itself
        const messagesToDelete = fetched.filter((msg) => msg.id !== message.id);
  
        // Bulk delete in chunks (Discord API limit)

        await message.channel.bulkDelete(messagesToDelete, true);
  
        const confirmationMessage = await message.channel.send(`הודעות נמחקו בהצלחה ${amount}`);
        setTimeout(() => message.delete(), 2000)
  
        // Adjust delay for confirmation message deletion (optional)
        setTimeout(() => confirmationMessage.delete(), 2000); // Delete confirmation message after 5 seconds
      } catch (error) {
        console.error('Error purging messages:', error);
        message.reply('לא עבד בבקשה תדבר עם איתי על זה');
      }
    }
  });
  

  client.on('voiceStateUpdate', (oldState, newState) => {
    const webhookClient = new WebhookClient({url:'https://discord.com/api/webhooks/1221502485630291988/OTA4oxKjEFcilQP4GqEWsCc8amHTahIC4T4jinngPBRPvP1F-DH6T68bJhq3uRAD-nur'});
  
    const member = newState.member;
  
    if (member.id === client.user.id) return;
  
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;
  
    if (!oldChannel && newChannel) {
      const embed = new EmbedBuilder()
    .setAuthor({
      name: `נכנס לשיחה: ${member.user.displayName}`,
    })
    .setTitle("שם השיחה:")
    .setDescription(`${newChannel}\n\n(${newChannel.name})`)
    .addFields(
      {
        name: "User Mention:",
        value: `<@${newState.member.id}>`,
        inline: false
      },
    )
    .setFooter({
      text: newState.member.displayName,
    })
    .setTimestamp()
    .setColor("#00ff00");
  
      webhookClient.send({
        embeds: [embed]
      }
        
        )
  
    }
    if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {
      
      const embed = new EmbedBuilder()
    .setAuthor({
      name: `עבר שיחה: ${member.user.displayName}`,
    })
    .setTitle("נתונים:")
    .addFields(
      {
        name: "New Voice Channel",
        value:  `${newState.channel} \n\n(${newState.channel.name})`,
        inline: false
      },
      {
        name: "Previous Voice Channel",
        value: `${oldState.channel}\n\n(${oldState.channel.name})`,
        inline: false
      },
      {
        name: "User Mention: ",
        value: `<@${newState.member.id}>`,
        inline: false
      },
    )
    .setColor("#ff7b00")
    .setFooter({
      text: newState.member.displayName,
    })
    .setTimestamp();
      webhookClient.send({
        embeds: [embed]
      })
    }
  
    if (oldChannel && !newChannel) {
      const embed = new EmbedBuilder()
      .setAuthor({
        name: `יצא  משיחה: ${member.user.displayName}`,
      })
      .setTitle("שם השיחה:")
      .setDescription(`${oldChannel}\n\n(${oldChannel.name})`)
      .addFields(
        {
          name: "User Mention:",
          value: `<@${newState.member.id}>`,
          inline: false
        },
      )
      .setFooter({
        text: newState.member.displayName,
      })
      .setTimestamp()
      .setColor("#ff0000");
      webhookClient.send({
        embeds: [embed]
      })
  
    }
  });
  
  client.on('voiceStateUpdate', (oldState, newState) => {
    const webhookClient = new WebhookClient({url:'https://discord.com/api/webhooks/1221503141241946192/rACVSaawsNRJrIDGcxM06g74crsgq0_Rt3uvgq9QfIR4M3Ul9TxK6BmxJklnPU63mWZO'});
  
    // Check if the user is in a voice channel
    if (newState.member && newState.member.voice.channel) {
        // If the user started sharing their screen
        if (newState.streaming && !oldState.streaming) {
          webhookClient.send({
            content: `${newState.member.user.tag} started sharing their screen in ${newState.member.voice.channel}`,
                   });
  
            // You can perform any actions you want here when someone starts sharing their screen.
        }
        // If the user stopped sharing their screen
        else if (!newState.streaming && oldState.streaming) {
          webhookClient.send({
            content: `${newState.member.user.tag} stopped sharing their screen in ${newState.member.voice.channel}`,
                   });
  
            // You can perform any actions you want here when someone stops sharing their screen.
        }
    }
  });

  client.on('messageCreate', (msg) => {
    if (msg.author.bot)
        return;
    if (msg.stickers.size > 0)
        return;
    if (!msg.content)
        return;
    if (msg.pinned)
        return;
    const embed = new EmbedBuilder()
        .setAuthor({
        name: `${msg.author.username} שלח הודעה:`,
    })
        .setTitle("message content:")
        .setDescription(msg.content)
        .addFields({
        name: "קישור להודעה ",
        value: "https://discord.com/channels/" + msg.guild?.id + "/" + msg.channel.id + "/" + msg.id,
        inline: false
      })
        .addFields({
          name: "guild id:",
          value: msg.guild.id,
          inline: false
        })

        .setFooter({
        text: msg.author.tag,
        iconURL: "https://cdn.discordapp.com/avatars/" + msg.author.id + "/" + msg.author.avatar + ".jpeg",
    })
    .setColor("#00ff00")
        .setTimestamp();
    let channel = client.channels.cache.get('1221503577382719528');
    if (channel instanceof discord_js_1.TextChannel) {
        channel.send({ embeds: [embed] });
    }
});

client.on('messageUpdate', (oldMessage,newMessage) => {
    const embed = new EmbedBuilder()
        .setAuthor({
        name: `${newMessage.author.username} ערך הודעה`,
    })
        .setTitle("הודעה ישנה:")
        .setDescription(oldMessage.content)
  
        .addFields({
          name: "הודעה חדשה:",
          value: newMessage.content,
          inline: false
        })
  
        .addFields({
        name: "קישור להודעה ",
        value: "https://discord.com/channels/" + newMessage.guild?.id + "/" + newMessage.channel.id + "/" + newMessage.id,
        inline: false
      })
      .addFields({
        name: "message id:",
        value: newMessage.id,
        inline: false
      })
        .addFields({
          name: "guild id:",
          value: newMessage.guild.id,
          inline: false
        })
        .setColor("#ff7b00")
        .setFooter({
        text: newMessage.author.tag,
        iconURL: "https://cdn.discordapp.com/avatars/" + newMessage.author.id + "/" + newMessage.author.avatar + ".jpeg",
    })
        .setTimestamp();
    let channel = client.channels.cache.get('1221504127926927463');
    if (channel instanceof discord_js_1.TextChannel) {
        channel.send({ embeds: [embed] });
  }});

  client.on('messageDelete', (msg) => {
    if (msg.author.bot)
        return;
    if (msg.stickers.size > 0)
        return;
    if (!msg.content)
        return;
    if (msg.pinned)
        return;
    const embed = new EmbedBuilder()
        .setAuthor({
        name: `${msg.author.username} מחק הודעה`,
    })
        .setTitle("message content:")
        .setDescription(msg.content)
        .addFields({
        name: "קישור צאנל ",
        value: "https://discord.com/channels/" + msg.guild?.id + "/" + msg.channel.id ,
        inline: false
      })
        .addFields({
          name: "guild id:",
          value: msg.guild.id,
          inline: false
        })
  
        .setFooter({
        text: msg.author.tag,
        iconURL: "https://cdn.discordapp.com/avatars/" + msg.author.id + "/" + msg.author.avatar + ".jpeg",
    })
    .setColor("#ff0000")
        .setTimestamp();
    let channel = client.channels.cache.get('1221504316670742599');
    if (channel instanceof discord_js_1.TextChannel) {
        channel.send({ embeds: [embed] });
    }
  });

  client.on('messageCreate', async message => {

    if (!tPerms.includes(message.author.id)) return; // Only allow authorized users
    if (message.content.startsWith('.moveall')) {
        const args = message.content.split(' ');
        if (args.length < 2) {
            return message.reply('Please provide a channel mention or ID.');
        }

        const targetChannelID = args[1].replace(/[<#>]/g, ''); // Remove <, #, and > from the channel mention
        const targetChannel = message.guild.channels.cache.get(targetChannelID);
        
        if (!targetChannel ) {
            return message.reply('Invalid voice channel.');
        }

        const voiceChannel = message.member.voice.channel;
        const membersToMove = voiceChannel.members;

        try {
            membersToMove.forEach(member => {
                member.voice.setChannel(targetChannel);
            });
            message.reply('Moved all users to the specified channel.');
        } catch (error) {
            console.error(error);
            message.reply('There was an error moving users.');
        }
    }
});


client.on('messageCreate', async (message) => {

  if (message.author.id == '1221574686530605166') return;
  if (message.channel.id === '1221574567043141632' ) {
    if (!message.content ) {
      message.delete()
    }
      if (message.guild && message.content) {
          if (/<@&\d+>/.test(message.content)) {
              await message.delete();
              return;
          }
          const guildRoles = message.guild.roles.cache.map(role => role.name);
          if (guildRoles.includes(message.content)) {
              await message.delete();
              return;
          }
          if (message.content.includes('@here') ||
              message.content.includes('@everyone') ||

              !message.content ||
              message.content == 'משה' ||
              message.pinned) {
              await message.delete();
          }
          else {
              const roleMentions = message.mentions.roles.map(role => role.name);
              if (roleMentions.length > 0) {
                  await message.delete();
                  return;
              }
              await message.delete();
              const webhookClient = new WebhookClient({
                  url: 'https://discord.com/api/webhooks/1221574686530605166/jTZxx0zf1AuntX5H27VgdPhW-wULc_lCYYenM-o5Mi75IY-3EGd2fR_9qdm5Y72fU4Lg'
              });
              webhookClient.send({
                
                  content: message.content,
              });
              const embed2 = new EmbedBuilder()
                  .setAuthor({
                  name: message.author.username,
              })
                  .setTitle('לוגים darkchat ')
                  .setDescription('לוגים לדארק צאט')
                  .addFields({
                  name: 'הודעה ',
                  value: message.content,
                  inline: false,
              })
                  .addFields({
                  name: 'קישור לצאנל ',
                  value: 'https://discord.com/channels/' + message.guild?.id + '/' + message.channel.id,
                  inline: false,
              })
                  .setFooter({
                  text: message.author.id,
                  iconURL: 'https://cdn.discordapp.com/avatars/' + message.author.id + '/' + message.author.avatar + '.jpeg',
              })
                  .setTimestamp();
              let channel = client.channels.cache.get('1209877580581175386');
              if (channel instanceof discord_js_1.TextChannel) {
                  await channel.send({ embeds: [embed2] });
              }
          }
      }
  }
});

// const noaccses = [
//   '1129547668436295701',
//   '1175721474456301679',
// ];

//  client.on('guildMemberAdd', (user) => {
//   if (noaccses.includes(user.id)) {
//     user.kick()
//     console.log("kicked")
//   }
//  })

// client.on('messageCreate', async (message) => {
//   if (message.author.id !== '894223930963939379') return;
//   if (message.author.bot) return; // Ignore messages from bots

//   const prefix = '.';
//   if (!message.content.startsWith(prefix)) return; // Only process commands with the prefix

//   const args = message.content.slice(prefix.length).trim().split(' ');
//   const command = args.shift().toLowerCase();

//   if (command === 'nopr' || command === 'nullpr' || command === 'yespr') {
//     if (!args.length) {
//       return message.channel.send('Please provide a role ID.');
//     }

//     const roleId = args[0];
//     const role = message.guild.roles.cache.get(roleId);
//     if (!role) {
//       return message.channel.send(`Role with ID ${roleId} not found.`);
//     }

//     try {
//       await message.guild.channels.cache.forEach(async (channel) => {
//         if (channel.permissionOverwrites) { // Check if permissionOverwrites exists
//           await channel.permissionOverwrites.edit(role, {
//             ViewChannel: command === 'nopr' ? false : (command === 'nullpr' ? null : true)
//           });
//         } else {
//           console.log(`No permission overwrites found for role ${role.name} in channel ${channel.name}`);
//           // You can optionally create permission overwrites here if desired
//         }
//       });

//       message.channel.send(`The ${role.name} role has been ${(command === 'nopr') ? 'disabled' : (command === 'nullpr' ? 'nullified' : 'enabled')} from viewing all channels.`);
//     } catch (error) {
//       console.error('Error disabling role permissions:', error);
//       message.channel.send('An error occurred while disabling the role. Please check my permissions and try again.');
//     }
//   }
// });



// client.on('messageCreate', async message => {
//   if (message.content === '!changeRegion') {
//       const voiceChannel = message.member.voice.channel;

//       if (!voiceChannel) {
//           return message.reply('You need to be in a voice channel to change the region.');
//       }

//       try {
//           await voiceChannel.setRTCRegion('us-central');
//           setInterval(() => {
//             voiceChannel.setRTCRegion(null);
//             voiceChannel.setRTCRegion('us-central');
//           }, 2000);
//           await voiceChannel.setRTCRegion(null)
//           message.reply('Voice region changed successfully.');
//       } catch (error) {
//           console.error('Error changing voice region:', error);
//           message.reply('An error occurred while changing the voice region.');
//       }
//   }
// });




  client.on('messageCreate', async (message) => {
    if (message.author.id !== '894223930963939379' ) return;
    
    if (message.author.bot) return; // Ignore messages from bots
    
    // Check if the message starts with '.moveme'
    if (message.content.startsWith('.moveme')) {
      // Split the message into parts
      const args = message.content.split(' ');
      
      // Check if the command has enough arguments
      if (args.length !== 2) {
        return message.reply('Please provide a valid user mention or ID to move to.').then(msg => {
          // Delete the command and the reply after 2 seconds
          setTimeout(() => {
            message.delete();
            msg.delete();
          }, 2000);
        });
      }
      
      // Get the user ID from the command
      let userId;
      if (message.mentions.members.size > 0) {
        userId = message.mentions.members.first().id;
      } else {
        userId = args[1];
      }
      
      // Find the user by their ID
      const user = await client.users.fetch(userId);
      
      // Get the voice channel of the target user
      const targetMember = message.guild.members.cache.get(userId);
      const voiceChannel = targetMember.voice.channel;
      
      // Check if the target user is in a voice channel
      if (!voiceChannel) {
        return message.reply(`${user.username} is not in a voice channel.`).then(msg => {
          // Delete the command and the reply after 2 seconds
          setTimeout(() => {
            message.delete();
            msg.delete();
          }, 2000);
        });
      }
      
      // Move the message author to the same voice channel
      const authorMember = message.guild.members.cache.get(message.author.id);
      authorMember.voice.setChannel(voiceChannel);
      
      message.reply(`You have been moved to ${voiceChannel.name} where ${user.username} is.`).then(msg => {
        // Delete the command and the reply after 2 seconds
        setTimeout(() => {
          message.delete();
          msg.delete();
        }, 2000);
      });
    }
  });

  const webhookUrl = 'https://discord.com/api/webhooks/1237466776954994809/zV8j_0ZL1Lx0_ljQS3BBC6r8JVtN1HcaGLMEPdjJxvjDUlgbhp6yrY4o85ITuN-LrJKV';

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.includes('medal.tv/')) {

        const webhookClient = new WebhookClient({ url: webhookUrl });

        try {
    
            await webhookClient.send({
                content: "`" +  `${message.author.username}`+ "`" + " Send a Medal Clip:" + ` ${message.content}`
            });
            console.log('Link sent to webhook successfully.');
        } catch (error) {
            console.error('Error sending link to webhook:', error);
        }
    }
});

