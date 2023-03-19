const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

let posts = [
    {
        'id': 'bear',
        'time': '1675540800',
        'name': 'DSC',
        'description': 'Triumph run',
        'players': ['Ri']
    }
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create')
        .setDescription('Create a raid')
        .addStringOption(option =>
            option
                .setName('id')
                .setDescription('The id that users will use to join the raid')
                // .setRequired(true)
        )
        .addStringOption(option => 
            option
                .setName('time')
                .setDescription('The date and time the raid will be (in timestamp format for now)')
                // .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The name of the raid')
                // .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('Optionally add details about the raid')    
        ),
    async execute(interaction) {
        // Get the variables from the command options
        const id = interaction.options.getString('id') ?? 'koala';
        const time = interaction.options.getString('time') ?? '1675378800';
        const name = interaction.options.getString('name') ?? 'DSC';
        const description = interaction.options.getString('description') ?? ' ';

        // Set up the post to be added to the list
        post = {
            'id': id,
            'time': time,
            'name': name,
            'description': description,
            'players': []
        }

        // Push the post and sort by timestamp
        posts.push(post);
        posts = posts.sort((a, b) => a.time - b.time);

        // Set up base post embed
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Raid Posts')
            .setDescription('Each raid has an emoji id, react with that emoji to be added to the raid');

        // Add each raid to the post embed
        for (let i = 0; i < posts.length; i++) {
            // Parse out players (sometimes it'll be blank)
            const p_players = posts[i].players;
            const players = p_players.length == 0 ? 'No one yet (0/6)' : p_players.join(', ') + ` (${p_players.length}/6)`;

            // Add each post to the embed
            f_desc = posts[i].description != ' ' ? `*${posts[i].description}*` : '';
            embed.addFields({
                name: `:${posts[i].id}: <t:${posts[i].time}:F>, ${posts[i].name}`,
                value: `${f_desc}\n${players}`
            });
        }

        const message = await interaction.send({ embeds: [embed] }).then(embedMessage => {
            embedMessage.react(':koala:');
        });
        // await interaction.reply('success!');
        // message.react(':koala:')
    },
};