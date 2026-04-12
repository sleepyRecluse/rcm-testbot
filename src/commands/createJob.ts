import {
  ChannelType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  ForumChannel,
  Guild,
} from "discord.js";

export const data: any = new SlashCommandBuilder()
  .setName("create-job")
  .setDescription("Creates new category using user selected name")
  .addStringOption((option) =>
    option.setName("job-id").setDescription("Job Id").setRequired(true),
  )
  .addStringOption((option) =>
    option.setName("job-name").setDescription("Job Name").setRequired(true),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const jobId: string = interaction.options.getString("job-id", true);
  const jobName: string = interaction.options.getString("job-name", true);
  const guild: Guild | null = interaction.guild;
  const roleId: string = interaction.user.id;

  if (guild) {
    const channel: ForumChannel = await guild.channels.create({
      name: `${jobId}_${jobName}`,
      type: ChannelType.GuildForum,
      parent: "1491611687478890596",

      permissionOverwrites: [
        {
          id: "1492937571389542490",
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
