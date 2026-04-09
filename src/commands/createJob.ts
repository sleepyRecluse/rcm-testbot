import {
  ChannelType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("create-job")
  .setDescription("Creates new category using user selected name")
  .addStringOption((option) =>
    option.setName("job-id").setDescription("Job Id").setRequired(true),
  )
  .addStringOption((option) =>
    option.setName("job-name").setDescription("Job Name").setRequired(true),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const jobId = interaction.options.getString("job-id", true);
  const jobName = interaction.options.getString("job-name", true);
  const guild = interaction.guild;
  const roleId = interaction.user.id;
  console.log(roleId);

  if (guild) {
    // const category = await guild.channels.create({
    //   name: `${jobName}`,
    //   type: ChannelType.GuildCategory,
    // });

    const channel = await guild.channels.create({
      name: `${jobId}_${jobName}`,
      type: ChannelType.GuildForum,
      parent: "1491611687478890596",

      permissionOverwrites: [
        {
          id: guild.roles.everyone.id,
          deny: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.SendMessagesInThreads,
          ],
        },
        {
          id: roleId,
          allow: [
            PermissionFlagsBits.ViewChannel,
            PermissionFlagsBits.SendMessages,
            PermissionFlagsBits.SendMessagesInThreads,
          ],
        },
      ],
    });

    await interaction.reply(`Created channel: ${channel}`);
  }
}
