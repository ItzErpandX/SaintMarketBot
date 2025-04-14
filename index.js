const {Client, Intents, MessageReaction, GatewayIntentBits, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder, Modal, TextInputBuilder, TextInputStyle, TextInputComponent, Collection, EmbedBuilder, MessageActionRow, MessageSelectMenu, MessageButton, Discord, AuditLogEvent, StringSelectMenuBuilder, Colors, ChannelType, ModalBuilder} = require("discord.js")
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions
    ]
});
const button1 = new ButtonBuilder()
    .setLabel('PayPal')
    .setStyle('Link') 
    .setEmoji('<app:1299789058511208639>')
    .setURL('https://paypal.me/xkay00'); 
const button2 = new ButtonBuilder()
    .setCustomId('copy_text_2')
    .setEmoji('<ltc:1298360076200837190>')
    .setLabel('Litecoin')
    .setStyle('Danger');
const button3 = new ButtonBuilder()
    .setLabel('Verify Here')
    .setStyle('Link') 
    .setEmoji('✔️')
    .setURL('https://restorecord.com/verify/Saint%20Market');
const row = new ActionRowBuilder().addComponents(button1, button2);
const db = require('quick.db')
const Invites = new Collection();
const moment = require('moment');
const fs = require('fs');
const usersMap = new Map();
const prefix = '!';
const ms = require('ms')
const axios = require('axios')
const { channel } = require('diagnostics_channel');
const { set } = require('express/lib/application');
const voiceCollection = new Collection();
const { syncBuiltinESMExports } = require("module");
const osu = require('node-os-utils');
var os = require('os');
client.commands = new Collection();
client.login("MTM0NjkzODUzOTc3Mzc4ODI2MQ.GTCYsB.pvmroNBU2vshzE1UhCopILvUlpzetHPYoJl1g4")
////// Start Up \\\\\\
client.once('ready', () => {
  console.log(`${client.user.tag} is online`);
  client.user.setPresence(
    { 
        activities: [
            { 
                name: 'Saint Market' , 
                type: "PLAYING" 
            }
        ], 
        status: "dnd" // online, idle, invisible, dnd
    }
) 
});
//Errors
client.on('shardError', error => {
    console.error('A websocket connection encountered an error:', error);
    })
    
    process.on('unhandledRejection', error => {
    console.error(error);
    });
////////////////////////
    const config = {

      "ticketrole": "1336747131599458465",
      "ticketlogs": "1346942329977835581",

      "color": "#00008b",
      "name": "Saint Market",
      "logo": "https://media.discordapp.net/attachments/1336727882516398140/1346941277131767858/Saint.png?ex=67ca0451&is=67c8b2d1&hm=81baaa6413e020eda7be6767c4a95ec1f44be90f92c3bad99f1ae498ddb2705d&=&format=webp&quality=lossless&width=593&height=593",
      "prefix": "!",

      "welcome": "1336671650694828052",
      "vouche": "1337093801860403355",

    "yt2mp3_review": "",
    "yt2mp3_logs": "",
    "yt2mp3_channel": "",
    "yt2mp3_message_id": "",

    "appmodal_logs": "1346942282472882177",
    "e1": "How old are you?",
    "e2": "Do you know how to edit Tickets?",
    "e3": "How long are you there in a day?",
    "e4": "Do you respect high team?",
    "e5": "Why do you want to join our Team?",

    "joinlogs": "1346941722562793482",
    "autorole": "1282405703784599656",
    "leavelogs": "1346941895846264936",
    "msglogs": "1346941924388634765",
    "voicelogs": "1346942182774280213",
    "rolelogs": "1346942041564778616",
    "channellogs": "1346942070031646782",
    "kicklogs": "1346942120816021626",
    "banlogs": "1346942156790697994",

    "promo_role": "1336747131599458465",

    "MEMBERS": "1342890571207020616",
    "BOOSTS": "1336731318087585886",
    "id": "1336668662610006096",
    "anti_link_logs": "1346947007306272901",
    "restock_ping_role": "1162414489925328916",
    "suggestion": "1293968077699944490"




    }
/////////////////////////////////////////////////////////////

// Ticket System Command
client.on("messageCreate", async (message) => {
  if (message.content.toLowerCase() === "!ticket") {
    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      message.delete();
      return;
    }
    message.delete();

    const embed = new EmbedBuilder()
      .setAuthor({ name: config.name, iconURL: config.logo })
      .setDescription("**To open a ticket, press the \"<:ticket:1268578442367209493>\" button.**")
      .setTitle("Tickets | Contact Us")
      .setThumbnail(config.logo)
      .setColor(config.color);

    const ticketOpen = new ButtonBuilder()
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("1268578442367209493") // No need for <:ticket:>
      .setCustomId("ticket_open");

    const row = new ActionRowBuilder().addComponents(ticketOpen);

    message.channel.send({ embeds: [embed], components: [row] });
  }
});

// Handle Ticket Creation
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== "ticket_open") return;

  const ticketExists = interaction.guild.channels.cache.find(
    (c) => c.topic === interaction.user.id
  );

  if (ticketExists) {
    await interaction.reply({ 
      embeds: [new EmbedBuilder().setTitle("Ticket Limit").setDescription("**You already have a Ticket open.**").setColor(config.color)], 
      ephemeral: true 
    });
    return;
  }

  const channel = await interaction.guild.channels.create({
    name: `🎫ticket-${interaction.user.username}`,
    parent: interaction.channel.parent,
    topic: interaction.user.id,
    type: ChannelType.GuildText,
    permissionOverwrites: [
      { id: interaction.user.id, allow: ["ViewChannel", "SendMessages"] },
      { id: interaction.guild.roles.everyone, deny: ["ViewChannel"] },
      { id: config.ticketrole, allow: ["ViewChannel", "SendMessages"] }
    ]
  });

  const embed = new EmbedBuilder()
    .setAuthor({ name: config.name, iconURL: config.logo })
    .setColor(config.color)
    .setDescription("**Please select the topic of your issue.**")
    .setThumbnail(config.logo);

  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("ticket_category")
      .setPlaceholder("Click here to select a category.")
      .addOptions([
        { label: "Collab", value: "🤝Collab", description: "To Collab.", emoji: "<:Rocket:1349788651479105629> " },
        { label: "Buy", value: "💵Buy", description: "To buy something.", emoji: "<:1724343953382:1349788503801725029>" },
        { label: "Question", value: "❓Question", description: "To ask a Question.", emoji: "<:Alert:1349788695019913346>" },
        { label: "Cancel Ticket", value: "cancel_ticket", description: "To cancel your Ticket.", emoji: "<:Web:1349792873767505982>" }
      ])
  );

  await channel.send({ embeds: [embed], components: [row] });
  await interaction.reply({ content: `✅ | Ticket created: ${channel}`, ephemeral: true });
});

// Handle Ticket Category Selection
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== "ticket_category") return;

  const category = interaction.values[0];

  if (category === "cancel_ticket") {
    await interaction.update({ content: "Ticket cancelled.", components: [] });

    const logEmbed = new EmbedBuilder()
      .setTitle("⛔ Ticket Canceled ⛔")
      .setDescription(`Ticket by <@${interaction.channel.topic}> was canceled by ${interaction.user}.`)
      .setColor(config.color);

    client.channels.cache.get(config.ticketlogs)?.send({ embeds: [logEmbed] });
    return interaction.channel.delete();
  }

  await interaction.update({ content: "Setting up your ticket...", components: [] });

  await interaction.channel.bulkDelete(5).catch(console.error);

  await interaction.channel.permissionOverwrites.set([
    { id: interaction.user.id, allow: ["SendMessages", "ViewChannel"] },
    { id: config.ticketrole, allow: ["SendMessages", "ViewChannel"] },
    { id: interaction.guild.roles.everyone, deny: ["ViewChannel"] }
  ]);

  await interaction.channel.setName(`${category}-${interaction.user.username}`).catch(console.error);

  const embed = new EmbedBuilder()
    .setDescription("**Describe your problem in detail. A staff member will assist you shortly.**")
    .setFooter({ text: 'To close the Ticket, press "🔒 Close"' })
    .setColor(config.color)
    .setAuthor({ name: `${interaction.user.tag} ● ${category}`, iconURL: interaction.user.displayAvatarURL() });

  const closeButton = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setLabel("🔒 Close")
    .setCustomId("ticket_close");

  const row = new ActionRowBuilder().addComponents(closeButton);

  await interaction.channel.send({ embeds: [embed], components: [row] });

  const logEmbed = new EmbedBuilder()
    .setTitle("🔨 Ticket Created 🔨")
    .setDescription(`Opened by: <@${interaction.user.id}>\nTopic: ${category}\nChannel: <#${interaction.channel.id}>`)
    .setColor(config.color);

  client.channels.cache.get(config.ticketlogs)?.send({ embeds: [logEmbed] });
});

// Handle Ticket Closing
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;
  if (interaction.customId !== "ticket_close") return;

  await interaction.update({ content: "Please rate the service before closing.", components: [] });

  const embed = new EmbedBuilder()
    .setAuthor({ name: config.name, iconURL: config.logo })
    .setDescription("**Rate our service before closing the ticket.**")
    .setColor(config.color);

  const row = new ActionRowBuilder().addComponents(
    new StringSelectMenuBuilder()
      .setCustomId("ticket_close_rating")
      .setPlaceholder("Click to rate before closing.")
      .addOptions([
        { label: "⭐", value: "⭐" },
        { label: "⭐⭐", value: "⭐⭐" },
        { label: "⭐⭐⭐", value: "⭐⭐⭐" }
      ])
  );

  await interaction.channel.send({ embeds: [embed], components: [row] });
});

// Handle Ticket Rating & Deletion
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;
  if (interaction.customId !== "ticket_close_rating") return;

  const rating = interaction.values[0];
  const logEmbed = new EmbedBuilder()
    .setTitle("✅ Ticket Closed ✅")
    .setDescription(`Opened by: <@${interaction.channel.topic}>\nClosed by: <@${interaction.user.id}>\nRating: ${rating}`)
    .setColor(config.color);

  client.channels.cache.get(config.ticketlogs)?.send({ embeds: [logEmbed] });
  await interaction.channel.delete();
});



//Welcome
client.on("guildMemberAdd", async (member) => {
  const user = member.user;
  const welcomeChannel = member.guild.channels.cache.get(config.welcome);
  const server = member.guild.name;
  await member.guild.members.fetch();
  const totalMembers = member.guild.members.cache.filter((m) => !m.user.bot).size;
  if (!welcomeChannel) return console.log("⚠️ Welcome channel not found!");
  const memberEmbed = new EmbedBuilder()
    .setAuthor({
      name: member.user?.username || "Unknown User", // Fallback if undefined
      iconURL: member.user?.displayAvatarURL({ size: 1024, dynamic: true }) || null,
    })
    .setDescription(`${user} Welcome to **${server}**!\n\nTotal Members: \`\`${totalMembers}\`\``)
    .setThumbnail("https://cdn.discordapp.com/attachments/1336727882516398140/1346941277131767858/Saint.png")
    .setColor(config.color)
    .setTimestamp();
  welcomeChannel.send({ embeds: [memberEmbed] }).catch(() => {});
  const button = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setCustomId("hdfh23")
    .setLabel(`Sent From Server: ${server}`)
    .setDisabled(true);
  const row = new ActionRowBuilder().addComponents(button);
  user.send({
    content: `Thanks for joining! Don't forget to invite your friends. Have a great time here in **${server}**`,
    components: [row],
  }).catch(() => {});
});



client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.id === config.vouche) {
    const newEmbed = new EmbedBuilder()
      .setAuthor({
        name: message.author.username, 
        iconURL: message.author.displayAvatarURL({ size: 1024, dynamic: true })
      })
      .setDescription(`**${message.content}**`)
      .setColor(config.color)
      .setTimestamp();
    await message.delete();
    message.channel.send({ embeds: [newEmbed] }).then((msg) => {
      //msg.react("<:cheart:1265350631003259070>");
    });
  }
});
//////////////////
//Youtube to Mp3 System
const ytdl = require('ytdl-core');
const { exec } = require("child_process");
const { triggerAsyncId } = require("async_hooks");
client.on('messageCreate', message => {
if(!message.guild) return;
  if (message.content.toLowerCase() === '!youtubebuilder') {
    if (!message.member.permissions.has("ADMINISTRATOR")) {
      message.delete()
    }
    else {
      message.delete()
      const embed = new Discord.EmbedBuilder()
        .setAuthor(config.name, config.logo)
        .setDescription(`**> Για να κατεβάσετε κάποιο τραγούδι από το YouTube σε Mp3, πατηστέ το κουμπί 📩. \n\n > Διαθεσιμότητα: 🟢 Εντός Λειτουργίας.**`)
        .setColor(config.color);
      const youtubetomp3 = new MessageButton()
        .setEmoji("📩")
        .setStyle("SECONDARY")
        .setCustomId("youtube")

      const informationyttomp3 = new MessageButton()
        .setEmoji("<:Information:1099683087505440868>")
        .setStyle("SECONDARY")
        .setCustomId("mp3_stats")




      const reviewyttomp3 = new MessageButton()
        .setEmoji("⭐")
        .setStyle("SECONDARY")
        .setCustomId("mp3_review")
      const row = new MessageActionRow()
        .addComponents(youtubetomp3)
        .addComponents(informationyttomp3)
        .addComponents(reviewyttomp3)

      message.channel.send({ embeds: [embed], components: [row] })
    }}
  })

  client.on("interaction", async interaction => {
    if (interaction.isButton()) {
      if (interaction.customId === 'mp3_review') {
        const modal = new Discord.Modal()
          .setCustomId('mp3_review1')
          .setTitle(`${interaction.guild.name} | Review`)
          .addComponents([
            new MessageActionRow().addComponents( 
                new Discord.TextInputComponent()
                .setCustomId('message')
                .setLabel('Γράψε την αξιολόγηση σου.')
                .setStyle('PARAGRAPH')
                .setMinLength(1)
                .setMaxLength(500)
                .setRequired(true),
            ),
          ]);
  
        await interaction.showModal(modal);
      }
    }
  }
  );

  client.on("interactionCreate", async interaction => {
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'mp3_review1') {
        const logschannel = client.channels.cache.get(config.yt2mp3_review)
        const rev = interaction.fields.getTextInputValue('message');
        const reviewembed = new EmbedBuilder()
          .setAuthor(interaction.member.user.username, interaction.user.displayAvatarURL({ size: 1024, dynamic: true }))
          .setColor(config.color)
          .setDescription(`**> Review From: ${interaction.member}\n\n > Review: \`\`\`\ ${rev} \`\`\`**`)
  
        logschannel.send({ embeds: [reviewembed] })
        interaction.reply({content:`**Η αξιολόγηση σου στάλθηκε.**`,ephemeral:true})
      }
    }
  })

//mp3 stats
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
    if (interaction.customId === 'mp3_stats') {
      const total_songs = db.get(`total_songs`)
const embed = new EmbedBuilder()
      .setTitle(`Youtube To Mp3 Stats`)
      .setColor('#00FF00')
      .setDescription(`**Έχουν γίνει download συνολικά \`\`${total_songs || `0`}\`\` τραγούδια.**`)
      interaction.reply({embeds:[embed],ephemeral:true})

    }
  })
//main source
  client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
      if (interaction.customId === 'youtube') {
        const modal = new Modal()
          .setCustomId('yt')
          .setTitle(`Youtube To Mp3`)
          .addComponents([
            new MessageActionRow().addComponents(
              new TextInputComponent()
                .setCustomId('link')
                .setLabel('Το link του τραγουδιού.')
                .setStyle('SHORT')
                .setMinLength(1)
                .setMaxLength(50)
                .setRequired(true),
            ),


          ]);
  
        await interaction.showModal(modal);
      }
    }
  
    if (interaction.isModalSubmit()) {
      if (interaction.customId === 'yt') {
        //const jon = db.fetch(`se_xrisi`)
        //if (jon === true)return interaction.reply({content:`**Κάποιος άλλος το χρησιμοποιεί.**`, ephemeral:true})
        const link = interaction.fields.getTextInputValue('link')
        if(!interaction.fields.getTextInputValue('link').includes(`youtu`))return interaction.reply({content:`**Το link αυτό δεν είναι από το youtube.**`,ephemeral:true});
        interaction.reply({content:`**Κοίτα στα προσωπικά σου μηνύματα.**`,ephemeral:true})
        const yes = new MessageButton()
        .setEmoji("<:yestick:973545157683183667>")
        .setStyle("SECONDARY")
        .setCustomId("swsto_song")
        const no = new MessageButton()
        .setEmoji("<:crossmark_274c:1097506441222434946>")
        .setStyle("SECONDARY")
        .setCustomId("lathos_song")
    const row = new MessageActionRow()
        .addComponents(yes)
        .addComponents(no)
            try {
              const info = await ytdl.getBasicInfo(link);
              if (info.videoDetails.isLiveContent) {
                return interaction.member.send('**Δεν μπορείτε να κάνετε λήψη ζωντανής ροής.**');
              }
            const duration = parseInt(info.videoDetails.lengthSeconds);
            if (duration > 600) {
              return interaction.member.send({content:`**Το τραγούδι δεν πρέπει να είναι μεγαλύτερο από 10 λεπτά.**`,ephemeral:true});
            }
            const title = info.videoDetails.title.replace(/[/\\?%*:|"<>]/g, '');
            const stream = ytdl(link, { filter: 'audioonly' });
            const path = `./${title}__${interaction.member.user.username}.mp3`;
            const writeStream = fs.createWriteStream(path);
            writeStream.on('error', (error) => {
        
            });
            const embed = new Discord.EmbedBuilder()
                      .setAuthor(config.name, config.logo)
                      .setDescription(`**> Για να κατεβάσετε κάποιο τραγούδι από το YouTube σε Mp3, πατηστέ το κουμπί 📩. \n\n > Διαθεσιμότητα: 🟡 Σε χρήση.**`)
                      .setColor(config.color);
                    const youtubetomp3 = new MessageButton()
                      .setEmoji("📩")
                      .setStyle("SECONDARY")
                      .setCustomId("youtube")
                      .setDisabled(true)
                    const informationyttomp3 = new MessageButton()
                      .setEmoji("<:Information:1099683087505440868>")
                      .setStyle("SECONDARY")
                      .setCustomId("mp3_stats")
              const reviewyttomp3 = new MessageButton()
                      .setEmoji("⭐")
                      .setStyle("SECONDARY")
                      .setCustomId("mp3_review")
                    const row2 = new MessageActionRow()
                      .addComponents(youtubetomp3)
                      .addComponents(informationyttomp3)
                      .addComponents(reviewyttomp3)
                      client.channels.cache.get(config.yt2mp3_channel).messages.fetch(config.yt2mp3_message_id).then(msg => msg.edit({embeds: [embed], components: [row2]}).catch(()=>{}))
                      db.set(`se_xrisi`,true)
            stream.pipe(writeStream);
            writeStream.on('finish', () => {
              exec(`ffmpeg -i ${path} -vn -ar 44100 -ac 2 -ab 192k -f mp3 ${path}.mp3`, (error, stdout, stderr) => {
                const file = `${path}`;
                                try {
                  //interaction.reply({content:`**Κοίτα στα προσωπικά σου μηνύματα.**`,ephemeral:true})
                  interaction.member.send({ content:`**Είναι το σωστό τραγούδι ?**`,components:[row],files: [file] ,ephemeral:true}).then(() => {
                    try {
                      fs.unlinkSync(`${file}`);
                      db.add(`total_songs`,1)
                      const embed = new Discord.EmbedBuilder()
                      .setAuthor(config.name, config.logo)
                      .setDescription(`**> Για να κατεβάσετε κάποιο τραγούδι από το YouTube σε Mp3, πατηστέ το κουμπί 📩. \n\n > Διαθεσιμότητα: 🟢 Εντός Λειτουργίας.**`)
                      .setColor(config.color);
                    const youtubetomp3 = new MessageButton()
                      .setEmoji("📩")
                      .setStyle("SECONDARY")
                      .setCustomId("youtube")
                    const informationyttomp3 = new MessageButton()
                      .setEmoji("<:Information:1099683087505440868>")
                      .setStyle("SECONDARY")
                      .setCustomId("mp3_stats")
              const reviewyttomp3 = new MessageButton()
                      .setEmoji("⭐")
                      .setStyle("SECONDARY")
                      .setCustomId("mp3_review")
                    const row2 = new MessageActionRow()
                      .addComponents(youtubetomp3)
                      .addComponents(informationyttomp3)
                      .addComponents(reviewyttomp3)
                      client.channels.cache.get(config.yt2mp3_channel).messages.fetch(config.yt2mp3_message_id).then(msg => msg.edit({embeds: [embed], components: [row2]}).catch(()=>{}))
                      db.set(`se_xrisi`,false)
			const embed33 = new EmbedBuilder()
				.setDescription(`**ο/η ${interaction.member} κατέβασε ένα τραγούδι.**`)
                      client.channels.cache.get(config.yt2mp3_logs).send({embeds:[embed33]})
                    } catch (error) {
                    }
                  });
                } catch (error) {
                }
                
                
              });
              
              
            })
          } catch (error) {
            interaction.member.send({content:`**Δεν βρέθηκε το link ξανά δοκίμασε.**`,ephemeral:true});
          }
          
        


        //
        
      }
    }
  });
  client.once('ready', () => {
try {
    const embed = new Discord.EmbedBuilder()
    .setAuthor(config.name, config.logo)
    .setDescription(`**> Για να κατεβάσετε κάποιο τραγούδι από το YouTube σε Mp3, πατηστέ το κουμπί 📩. \n\n > Διαθεσιμότητα: 🟢 Εντός Λειτουργίας.**`)
    .setColor(config.color);
  const youtubetomp3 = new MessageButton()
    .setEmoji("📩")
    .setStyle("SECONDARY")
    .setCustomId("youtube")
  const informationyttomp3 = new MessageButton()
    .setEmoji("<:Information:1099683087505440868>")
    .setStyle("SECONDARY")
    .setCustomId("mp3_stats")
const reviewyttomp3 = new MessageButton()
    .setEmoji("⭐")
    .setStyle("SECONDARY")
    .setCustomId("mp3_review")
  const row2 = new MessageActionRow()
    .addComponents(youtubetomp3)
    .addComponents(informationyttomp3)
    .addComponents(reviewyttomp3)
    client.channels.cache.get(config.yt2mp3_channel).messages.fetch(config.yt2mp3_message_id).then(msg => msg.edit({embeds: [embed], components: [row2]}).catch(()=>{}))
    db.set(`se_xrisi`,false)
}  catch (error) {
          
          }
  })
  client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
      if (interaction.customId === 'swsto_song') {
        interaction.update({content:` `,components:[],ephemeral:true})

      }

      if (interaction.customId === 'lathos_song') {
        interaction.update({files:[],content:`**Δοκίμασε να το ξανά κατεβάσεις.**`,components:[],ephemeral:true})

      }
      
    })


//Advance Application System With Modal
client.on('messageCreate', message => {
if(!message.guild) return;
  if (message.content.toLowerCase() === '!apps') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      message.delete()
    }  
    else {
      message.delete()
    const embed = new EmbedBuilder()
      .setAuthor({ name: config.name, iconURL: config.logo })
      .setDescription(`**Welcome to ${message.guild.name}.To join on  __Saint Market Staff Team__™, click on the button bellow and complete the application form.**`)
      .setThumbnail(config.logo)
      .setColor(config.color);
   // const row = new ActionRowBuilder()
   //   .addComponents(button4)
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('apptmodal')
        .setLabel('💼')
        .setStyle(ButtonStyle.Secondary)
);
    message.channel.send({embeds: [embed], components: [row]})
  }
}
})
///////////
client.on('interactionCreate', async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.customId === 'apptmodal') {
      const modal = new ModalBuilder()
        .setCustomId('app_modal')
        .setTitle(`Application | ${interaction.user.username}`)
        .addComponents([
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('appmodal_input_1')
              .setLabel(config.e1)
              .setStyle(TextInputStyle.Paragraph)
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Write your answer here')
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('appmodal_input_2')
              .setLabel(config.e2)
              .setStyle(TextInputStyle.Paragraph)
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Write your answer here')
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('appmodal_input_3')
              .setLabel(config.e3)
              .setStyle(TextInputStyle.Paragraph)
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Write your answer here')
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('appmodal_input_4')
              .setLabel(config.e4)
              .setStyle(TextInputStyle.Paragraph)
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Write your answer here')
              .setRequired(true)
          ),
          new ActionRowBuilder().addComponents(
            new TextInputBuilder()
              .setCustomId('appmodal_input_5')
              .setLabel(config.e5)
              .setStyle(TextInputStyle.Paragraph)
              .setMinLength(1)
              .setMaxLength(200)
              .setPlaceholder('Write your answer here')
              .setRequired(true)
          ),
        ]);

      await interaction.showModal(modal);
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'app_modal') {
      const response1 = interaction.fields.getTextInputValue('appmodal_input_1');
      const response2 = interaction.fields.getTextInputValue('appmodal_input_2');
      const response3 = interaction.fields.getTextInputValue('appmodal_input_3');
      const response4 = interaction.fields.getTextInputValue('appmodal_input_4');
      const response5 = interaction.fields.getTextInputValue('appmodal_input_5');

      const embed2 = new EmbedBuilder()
        .setAuthor({ name: config.name, iconURL: config.logo })
        .setColor('#00FF00')
        .setDescription("**Το Application σου στάλθηκε.**");

      interaction.reply({ embeds: [embed2], ephemeral: true });

      const embed = new EmbedBuilder()
        .addFields(
          { name: `Application From:`, value: `**${interaction.member} | ${interaction.user.username} | \`\`${interaction.user.id}\`\`**`, inline: true },
          { name: `${config.e1}`, value: `\`${response1}\``, inline: false },
          { name: `${config.e2}`, value: `\`${response2}\``, inline: false },
          { name: `${config.e3}`, value: `\`${response3}\``, inline: false },
          { name: `${config.e4}`, value: `\`${response4}\``, inline: false },
          { name: `${config.e5}`, value: `\`${response5}\``, inline: false }
        )
        .setColor(config.color)
        .setTimestamp()
        .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ size: 1024, dynamic: true }) });

      client.channels.cache.get(config.appmodal_logs).send({ embeds: [embed] });
    }
  }
});



///Join-Left Logs
client.on('guildMemberAdd', (member) => {
    const user = member.user
    const channelID = member.guild.channels.cache.get(config.joinlogs)
    const guild = member.guild.id
    const memberEmbed = new EmbedBuilder()
    //.setAuthor( member.user.username, member.user.displayAvatarURL(), "https://discord.com/users/" + member.user.id)
    .setAuthor({ 
      name: member.user.username, 
      iconURL: member.user.displayAvatarURL(), 
      url: `https://discord.com/users/${member.user.id}`
    })
    .setDescription(` \`\`\` Join \`\`\` \n**Register**: \`${moment(member.user.createdAt).format("MMM Do YYYY").toLocaleString()}\`\n**Mention:** <@!${member.user.id}>`)
      .setColor('#00FF00')
        const role = member.guild.roles.cache.get(config.autorole)//auto role
        member.roles.add(role).catch(() => { })
        channelID.send({embeds: [memberEmbed] })
    })
    client.on('guildMemberRemove', (member) => {
    const monitorID = member.guild.channels.cache.get(config.leavelogs)//left logs
    const guild = member.guild.id 
    const memberEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setDescription(` \`\`\` Leave \`\`\` \n**Register**: \`${moment(member.user.createdAt).format("MMM Do YYYY").toLocaleString()}\`\n**Mention:** <@!${member.user.id}>`)
      .setAuthor({ 
        name: member.user.username, 
        iconURL: member.user.displayAvatarURL(), 
        url: `https://discord.com/users/${member.user.id}`
      })
        monitorID.send({embeds: [memberEmbed] })
    })
  ////// Message Edit Logs \\\\\\
  client.on("messageUpdate", async (oldMessage, newMessage) => {
    try{
  if(newMessage.author.bot) return
  let channel = oldMessage.guild.channels.cache.get(config.msglogs)
  const url = oldMessage.url
  const embed = new EmbedBuilder()
  .setTitle(`Edited Message Logs`)
  .setColor('#993366')
  .setTimestamp()
  .setURL(url)
  .addField(`Old message`, `*${oldMessage.content}*`, false)
  .addField(`New message`, `*${newMessage.content}*`, false)
  .addField(`From`, `**<@${oldMessage.author.id}>**`, true)
  .addField(`Channel`, `**<#${oldMessage.channel.id}>**`, true)
  channel.send({embeds: [embed] }).catch(()=>{})
    }catch{
        
    }
  })
  var temporary = [];
  
  ////// Message Delete \\\\\\
  client.on('messageDelete', async message => {
      if (!message.guild) return;
      const fetchedLogs = await message.guild.fetchAuditLogs({
          limit: 1,
          type: AuditLogEvent.MessageDelete,
      });
      const deletionLog = fetchedLogs.entries.first();
      const embed = new EmbedBuilder({
      //const embed = new EmbedBuilder({
        "author": {
          "name": message.author.tag,
          "url": "https://discord.com/users/" + message.author.id ,
          "icon_url": message.author.displayAvatarURL()
        },
        "color": 15483204,
        "description": "​\n" + message.content + "\n\n**Mention: <@" + message.author.id + ">\nChannel: <#" + message.channel.id + ">**"
      })
      if (!deletionLog) return     client.channels.cache.get(config.msglogs).send({embeds: [embed] })
  
      const { executor, target } = deletionLog;
      const embed2 = new EmbedBuilder({
        "author": {
          "name": message.author.tag,
          "url": "https://discord.com/users/" + message.author.id,
          "icon_url": message.author.displayAvatarURL()
        },
        "color": 15483204,
        "description": "​\n" + message.content + "\n\n**Mention: <@" + message.author.id + ">\nChannel: <#" + message.channel.id + ">**\n**From: <@" + executor.id + ">**"
      })
      const embed3 = new EmbedBuilder({
        "author": {
          "name": message.author.tag,
          "url": "https://discord.com/users/" + message.author.id ,
          "icon_url": message.author.displayAvatarURL()
        },
        "color": 15483204,
        "description": "​\n" + message.content + "\n\n**Mention: <@" + message.author.id + ">\nChannel: <#" + message.channel.id + ">**"
      })
    try{
      if (target.id == message.author.id) {
      client.channels.cache.get(config.msglogs).send({embeds: [embed2] }).catch(()=>{})
      } else {
      client.channels.cache.get(config.msglogs).send({embeds: [embed3] }).catch(()=>{})
      }
  }catch{
    
  }
  });

//voice logs
var temporary = [];
client.on('voiceStateUpdate', (oldMember, newMember) => {
  let newUserChannel = newMember.channelId;
  let oldUserChannel = oldMember.channelId;


try{
    if(newUserChannel){
    const voicelogs = newMember.guild.channels.cache.get(config.voicelogs)
    const voicee = new EmbedBuilder({
      "author": {
        "name": newMember.member.user.tag,
        "url": "https://discord.com/users/" + newMember.member.user.id,
        "icon_url": newMember.member.user.displayAvatarURL()
      },
      "color": 4371328,
      "description": "**Channel: <#" + newUserChannel + "> • " + newMember.channel.name + "\nMention: <@" + newMember.member.user.id + ">**"
    })
    voicelogs.send({ embeds: [voicee] })
    }

    else{
      if(oldUserChannel){
        const voicelogs = oldMember.guild.channels.cache.get(config.voicelogs)
        const voice = new EmbedBuilder({
          "author": {
            "name": newMember.member.user.tag,
            "url": "https://discord.com/users/" + newMember.member.user.id,
            "icon_url": newMember.member.user.displayAvatarURL()
          },
          "color": 15681608,
          "description": "**Channel: <#" + oldUserChannel + "> • `" + oldMember.channel.name + "`\nMention: <@" + oldMember.member.user.id + ">**"
        })
        voicelogs.send({ embeds: [voice] })
      }
  }
}catch{
  e => console.log(e.message)
}
})





  ////// Role Create-Delete Logs \\\\\\
  client.on("roleCreate", async (role) => {
    const fetchedLogs = await role.guild.fetchAuditLogs({
          limit: 1,
          type: 'ROLE_CREATE',
      });
  
    const fasdfa = fetchedLogs.entries.first();
      let { executor, target, reason } = fasdfa;
    if(executor === null) executor = "\u200B";
    if(target === null) target = "\u200B";
    if(reason === null) reason = "\u200B";
  
      const embed = new EmbedBuilder()
        .setColor("#00FF00")
        .setAuthor(executor.username, executor.displayAvatarURL(), `https://discord.com/users/${executor.id}`)
        .setDescription("A new role was created!")
        .addFields(
          {name: "User", value: executor.username},
          {name: "Role Name", value: target.name},
          {name: "Role ID", value: target.id},
          {name: "reason", value: reason}
        )
        // .setFooter(`Role ID: ${id}`)
        .setTimestamp();
  
        client.channels.cache.get(config.rolelogs).send({embeds: [embed] }).catch(() => { })
        })
  client.on("roleDelete", async (role) => {
  
    const fetchedLogs = await role.guild.fetchAuditLogs({
          limit: 1,
          type: 'ROLE_DELETE',
      });
  
    const fasdfa = await fetchedLogs.entries.first();
      let { executor, target, reason, a } = fasdfa;
    if(executor === null) executor = "\u200B";
    if(target === null || target === undefined) target = "\u200B";
    if(reason === null) reason = "\u200B";
  
      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setAuthor(executor.username, executor.displayAvatarURL(), `https://discord.com/users/${executor.id}`)
        .setDescription("A new role was Deleted!")
        .addFields(
          {name: "User", value: executor.username},
          {name: "Role Name", value: role.name},
          {name: "Role ID", value: role.id},
          {name: "reason", value: reason}
        )
        // .setFooter(`Role ID: ${id}`)
        .setTimestamp();
  
        client.channels.cache.get(config.rolelogs).send({embeds: [embed] })
  
  });
//role update
client.on('guildMemberUpdate', async function(oldMember, newMember) {
    const log = await newMember.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberRoleUpdate }).then(logs => logs.entries.first());
    let addedRoles = newMember.roles.cache.filter(role => !oldMember.roles.cache.has(role.id));
    let removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
  
    if (removedRoles.size > 0) {
      const removeRoleEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        //.setAuthor(`${oldMember.user.tag}`, oldMember.user.avatarURL())
        .setAuthor({ 
          name: oldMember.user.tag, 
          iconURL: oldMember.user.avatarURL() 
        })
        .setDescription(`<@!${oldMember.id}> lost the role <@&${removedRoles.map(r => r.id)}> from <@!${log.executor.id}>`)
        .setTimestamp()
        //.setFooter(`ID : ${oldMember.id}`)
        .setFooter({ text: `ID : ${oldMember.id}` })
      client.channels.cache.get(config.rolelogs).send({embeds: [removeRoleEmbed] })
    }
  
    if (addedRoles.size > 0) {
      const addRoleEmbed = new EmbedBuilder()
        .setColor('#00FF00')
        //.setAuthor(`${oldMember.user.tag}`, oldMember.user.avatarURL())
        .setAuthor({ 
          name: oldMember.user.tag, 
          iconURL: oldMember.user.avatarURL() 
        })
        .setDescription(` <@!${log.executor.id}> added the role <@&${addedRoles.map(r => r.id)}> to <@!${oldMember.id}>`)
        .setTimestamp()
        .setFooter({ text: `ID : ${oldMember.id}` })
      client.channels.cache.get(config.rolelogs).send({embeds: [addRoleEmbed] })
    }
  });
//channel create
client.on("channelCreate", async function(channel) {
    const logs = await channel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelCreate });
    const log = logs.entries.first();
    if (!log) return;
    const embed = new EmbedBuilder()
      .setTitle("Channel Created")
      .setColor("#00FF00")
      .setDescription(`From : <@!${log.executor.id}>\nChannel : <#${channel.id}>\nType : ${channel.type}\nName : ` + channel.name)
      .setTimestamp()
      //.setFooter("ID :" + channel)
      .setFooter({ text: "ID : " + channel })
    client.channels.cache.get(config.channellogs).send({embeds: [embed] })
  });
  //channel delete
  client.on("channelDelete", async function(channel) {
    const logs = await channel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelDelete });
    const log = logs.entries.first();
    if (!log) return;
    const embed = new EmbedBuilder()
      .setTitle("Channel Deleted")
      .setColor("#FF0000")
      .setDescription(`From : <@!${log.executor.id}>\nChannel : <#${channel.id}>\nType : ${channel.type}\nName : ` + channel.name)
      .setTimestamp()
      .setFooter({ text: "ID : " + channel })
    client.channels.cache.get(config.channellogs).send({embeds: [embed] })
  });
//kick 
client.on('guildMemberRemove', async member => {
    const logs = await member.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberKick });
    const log = logs.entries.first();
    const { reason } = log;
    
    if (!log) return;
    const embed = new EmbedBuilder()
      .setColor("#FF0000")
      .setDescription(`${member.user} **kicked**\n\nfrom : ${log.executor}\nReason : ${reason}`)
    if (Date.now() - log.createdTimestamp < 5000) {
      client.channels.cache.get(config.kicklogs).send({embeds: [embed] })
    
    }})
//ban logs
client.on('guildBanAdd', async ban => {
  const logs = await ban.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanAdd });
  const log = logs.entries.first();
  const { reason } = log;
  if (!log) return;
  const embed = new EmbedBuilder()
    .setColor("#FF0000")
    .setDescription(`${ban.user} **banned**\n\nFrom : ${log.executor}\nReason : ${reason}`)
  if (Date.now() - log.createdTimestamp < 5000) {
    client.channels.cache.get(config.banlogs).send({embeds: [embed] })
  }})
//unban logs
client.on('guildBanRemove', async member => {
      const logs = await member.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberBanRemove });
      const log = logs.entries.first();
      const { reason } = log;
      if (!log) return;
      const embed = new EmbedBuilder()
        .setColor("#FF0000")
        .setDescription(`${member.user} **unbanned**\n\nFrom : ${log.executor}`)
      if (Date.now() - log.createdTimestamp < 5000) {
        client.channels.cache.get(config.banlogs).send({embeds: [embed] })
      
      
  }})



//paid promotion
    client.on('messageCreate', message => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


        if(command === 'promo'){
            if (!message.member.permissions.has("ADMINISTRATOR")) {
          message.delete()
        }  
        else {
          message.delete()
const content = args.join(' ');
        const embed = new EmbedBuilder()
          .setAuthor( config.name, config.logo)
          .setDescription(`${content}`)
    .setThumbnail( config.logo)
    .setColor( config.color);
        const appbutton = new MessageButton()
          .setStyle('SECONDARY')
          .setCustomId('promo_open');
        const row = new MessageActionRow()
          .addComponents(appbutton)
    
        message.channel.send({embeds: [embed], components: [row]})
      }
    }
    })
////////////////////////////////////////////////////////////////
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
      if (interaction.customId === 'promo_open') {
        
        if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
          return interaction.reply({content: `**Έχετε ήδη ένα Promo υπό επεξεργασία.**`,ephemeral: true})
}     
        interaction.guild.channels.create(`promo-${interaction.user.username}`, {
          parent: interaction.channel.parent,
          topic: interaction.user.id,
          permissionOverwrites: [{
              id: interaction.user.id,
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
              id:  config.promo_role,
              allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
            },
            {
              id: interaction.guild.roles.everyone,
              deny: ['VIEW_CHANNEL'],
            },
          ],
          type: 'text',
        }).then(async c => {
          interaction.reply({content: `**✅ | ${c}**`, ephemeral: true}).catch(() => { })
          const embed = new EmbedBuilder()
          .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL())
          .setColor( config.color)
          .setDescription("```Ποιο πακέτο θέλετε;```")
          .setFooter(`Για να κλείσετε το Promo πατήστε "🔒Close"`)
          const send2 = new MessageButton()
          .setStyle("SECONDARY")
          .setLabel("\🔒Close")
          .setCustomId("promo_close")
          const send = new MessageActionRow()
          .addComponents(send2)
          msg = await c.send({embeds: [embed],components: [send]})
          })
          
      }
    })
client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
      if (interaction.customId === 'promo_close') {
       interaction.reply({ ephemeral: true}).catch(() => { })
          interaction.channel.delete().catch(() => { })
       }})







//Server Stats
client.on("ready", function(){
  if(config.MEMBERS){
      const member = client.guilds.cache.get(config.id).channels.cache.get(config.MEMBERS)
      if(member){
          setInterval(() => {
              member.setName(`👤Members: ${client.guilds.cache.get(config.id).members.cache.filter(member => !member.user.bot).size}`).catch(() => { })  
          }, 5 * 60 * 1000);
      }
  }
  if(config.BOOSTS){
      const boost = client.guilds.cache.get(config.id).channels.cache.get(config.BOOSTS)
      if(boost){
          setInterval(() => {
              boost.setName(`🔮・Boosts: ${client.guilds.cache.get(config.id).premiumSubscriptionCount}`).catch(() => { })  
          }, 5 * 60 * 1000);
      } 
  }

})




//lock & unlock command
client.on("messageCreate", async message =>{
if(!message.guild) return;
  
    if (message.content === '!lock'){
      if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
      message.channel.send({content: "Channel Locked"})
      message.channel.permissionOverwrites.set([
        {
          id: message.guild.id,
          deny: ['SEND_MESSAGES']
        },
    ])
  
  }}})  
  client.on("messageCreate", async message =>{
if(!message.guild) return;
  

      if (message.content === '!unlock'){
        if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)){
      message.channel.send({content: "Channel unlocked"})
      message.channel.permissionOverwrites.set([
        {
          id: message.guild.id,
          allow: ['SEND_MESSAGES']
        },
    ])
    }}})
///!say2 command
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'say2'){
        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
              const content = args.join(' ');
              const embed = new EmbedBuilder()
                .setColor(config.color)
                .setThumbnail(config.logo)
                .setAuthor(config.name,config.logo)
                .setDescription(content);
                message.channel.send({embeds: [embed]});
              message.delete({timeout: 1500}).catch(err => console.log(err));
      }
  })
//!say command
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'say'){
        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;
              const content = args.join(' ');
              message.channel.send({content: `${content}`});
              message.delete({timeout: 1500}).catch(err => console.log(err));
      }
  })


/// purge/ clear///
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
      if(message.content.startsWith('!purge') || message.content.startsWith('!clear')){
        if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply("**You do not have permissions.**")
              const content = args.join(' ');
              if(!content) return message.channel.send("How many messages do you want to delete ?")
              message.channel.bulkDelete(content).catch(e => {message.channel.send('You can not delete so old messages.')})

      }
  })



//Ban Command
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'ban'){
    const target = message.mentions.users.first();
    if(!message.member.permissions.has(PermissionsBitField.Flags.Administrator))return message.channel.send({content: "❌"})
    if(target){
        const memberTarget = message.guild.members.cache.get(target.id);
        memberTarget.ban().catch(()=>{})
        const newEmbed = new EmbedBuilder()
        .setColor('#FF0000')
        .setDescription("**"+target.tag+"** has been banned\n\nModerator : <@"+message.author.id+">\n\nRemaining Bans: Unlimited | ``Administrator with a higher role``")
        .setTimestamp()

        message.channel.send({embeds: [newEmbed]});
    }else{        
    message.delete().catch(err => console.log(err));

  }}
})
//Unban Command
client.on('messageCreate', async (message) => {
  if (!message.guild) return;
  const args = message.content.trim().split(/ +/);
  const command = args.shift().toLowerCase();
  if (command === '!unban') {
    if (!message.member.permissions.has('ADMINISTRATOR'))return
    if (args.length !== 1) {
      return message.reply('Usage: !unban id');
    }
    const userId = args[0];
    try {
      await message.guild.bans.remove(userId);
      message.reply(`**✅ Unbanned: ${userId}**`);
    } catch (error) {
      console.error(error);
    }
  }
});

//Kick Command
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'kick'){
    const target = message.mentions.users.first();
    if(!message.member.permissions.has("ADMINISTRATOR"))return message.channel.send({content: "❌"})
         if(target){
             const memberTarget = message.guild.members.cache.get(target.id);
             memberTarget.kick().catch(()=>{})
             const newEmbed = new EmbedBuilder()
             .setColor('#FF0000')
             .setDescription("**"+target.tag+"** has been kicked\n\nModerator : <@"+message.author.id+">\n\n``Administrator with a higher role``")
             .setTimestamp()
 
             message.channel.send({embeds: [newEmbed]});
         }else{        
         message.delete().catch(err => console.log(err));

  }}
})
//!serverinfo
client.on('messageCreate', async(message) => {
if(!message.guild) return;
  if (message.author.bot)return
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  if(command === 'serverinfo'){
        if(!message.member.permissions.has("ADMINISTRATOR")) return;
        const member = message.mentions.users.first() || message.member
        let owner = await message.guild.fetchOwner()

              //let member = message.mentions.users.first() || message.member;

              const embed = new EmbedBuilder()
                
                .setAuthor(config.name,config.logo)
                .setColor(config.color)
                .addFields(
                  { name: `Ownership`, value: `${owner}`, inline: false},
                  { name: `Total Members`, value: `\`${message.guild.memberCount}\``, inline: false},
                  { name: `Total Boosts`, value: `\`${message.guild.premiumSubscriptionCount}\``, inline: false},
                  { name: `Total Channels`, value: `\`${message.guild.channels.cache.size}\``, inline: false},
                  { name: `Total Roles`, value: `\`${message.guild.roles.cache.size}\``, inline: false},
                  { name: `Total Emojis`, value: `\`${message.guild.emojis.cache.size}\``, inline: false},
                  { name: `Δημιουργήθηκε στις:`, value: `\`${moment(message.guild.createdAt).format("MMM Do YYYY").toLocaleString()}\``, inline: false},
                  { name: `Server ID`, value: `\`${message.guildId}\``, inline: false},
                  { name: `Server Name`, value: `\`${message.guild.name}\``, inline: false},

                )
          message.channel.send({embeds: [embed]})

      }
  })

//Embed Suggestion
client.on("message", async message =>{
  if(message.author.bot) return;
  if(message.channel.id === config.suggestion){
  const newEmbed = new EmbedBuilder()
  .setAuthor(config.name,config.logo)
  .setDescription(`**From : **${message.member}\n\n**Suggestion : **\`\`${message.content}\`\``)
  .setColor(config.color)
  .setTimestamp() 
    message.channel.send({embeds: [newEmbed]}).then((msg) =>{
    msg.react("👍");
    msg.react("👎");
    message.delete();
    });
  }
  });

//Restock Ping
const ping_role = config.restock_ping_role
client.on("messageCreate", async message => {
  if (message.content.startsWith("!restock_ping")) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send("**Χρειάζεται να έχεις Administrator**")
    const embed = new EmbedBuilder()
      .setAuthor(config.name,config.logo)
      .setThumbnail(config.logo)
      .setDescription("**Restock Ping**")
      .setColor(config.color)
    const koumpi = new MessageButton()
      .setEmoji("🎉")
      .setStyle("SECONDARY")
      .setCustomId("rping")
  const row = new MessageActionRow()
      .addComponents(koumpi)
    message.channel.send({embeds: [embed],components: [row]})
  }})
  client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
    if (interaction.customId === 'rping') {
      interaction.member.roles.add(ping_role)
      interaction.reply({content: `**The role has been added to you: **<@&${ping_role}>`, ephemeral: true})
  }})

     //Anti Link System\\
      client.on("messageCreate", async message =>{

            if(message.content.includes("discord.gg/") || message.content.includes("discord.io/") || message.content.includes("youtube.com/") || message.content.includes("https://") || message.content.includes("twitch.tv/") || message.content.includes("discord.com/")){
                  if (message.member.permissions.has(PermissionsBitField.Flags.Administrator))return
                  
                  message.delete().catch(()=>{})
                  message.member.send("**You cant send links**").catch(()=>{})
                      const logs = message.guild.channels.cache.get(config.anti_link_logs)
                      if(logs){
                          const embed = new EmbedBuilder()
                          .setTitle("**Anti Links System**")
                          .setDescription("** <@!"+message.member.user.id+"> ("+message.member.user.username+") tried to send a link!\n\nLink : **||"+message.content+"||")
                          .setFooter({ text: `ID (${message.member.user.id})` })
                          .setColor(config.color)
                          logs.send({embeds: [embed] })
                      }}})
                      client.on('messageCreate', async message => {
                        if (message.author.bot) return;
                        
                        if (message.content === '!verify') {
                          // Δημιουργία embed μηνύματος
                          const embed = new EmbedBuilder()
                            .setTitle('Verify System')
                            .setDescription(`If we get nuked or something I want to continue this Project and this is you need to do if u also want to get informated.
`)
                            .setColor('#00008b')
                            .setThumbnail('https://cdn.discordapp.com/attachments/1336727882516398140/1346941277131767858/Saint.png?ex=67ca0451&is=67c8b2d1&hm=81baaa6413e020eda7be6767c4a95ec1f44be90f92c3bad99f1ae498ddb2705d&')
                            .setFooter({ text: "Saint Market ©️" });
                          //const row = new Discord.MessageActionRow().addComponents(button3);
                          const row = new ActionRowBuilder().addComponents(button3);
                          const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
                          setTimeout(() => {
                            message.delete().catch(console.error); 
                          }, 1000);
                        }
                      });
client.on('messageCreate', async message => {
  if (message.author.bot) return;
  
  if (message.content === '!pay') {
    const embed = new EmbedBuilder()
      .setTitle('Payment Methods')
      .setDescription(`**Click a button to select your payment method !**
        
        * __PayPal Payment **ONLY** With **F&F** Option !__
        * __Send Screenshot After Payment !__`)
      .setColor('#BF40BF')
      .setThumbnail('https://cdn.discordapp.com/attachments/1336727882516398140/1346941277131767858/Saint.png?ex=67ca0451&is=67c8b2d1&hm=81baaa6413e020eda7be6767c4a95ec1f44be90f92c3bad99f1ae498ddb2705d&')
      .setFooter({ text: "Saint Market ©️" });
    const sentMessage = await message.channel.send({ embeds: [embed], components: [row] });
    setTimeout(() => {
      message.delete().catch(console.error);
    }, 1000);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isButton()) return;
  
  let copyMessage = '';
  let responseMessage = '';

  if (interaction.customId === 'copy_text_2') {
    copyMessage = 'LQDTTkAFGq7edvUFfL3115YvwQAhTEw4pD';
    responseMessage = '**__Litecoin Address:__ **';
  } 

  if (copyMessage) {
    await interaction.reply({ 
      content: `${responseMessage}\n\`\`\`${copyMessage}\`\`\``, 
      ephemeral: true 
    });
  }
});