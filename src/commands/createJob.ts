import {
  ChannelType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("create-job")
  .setDescription("Creates new category using user selected name")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("Create job channel")
      .setRequired(true),
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const jobName = interaction.options.getString("name", true);
  const guild = interaction.guild;

  if (guild) {
    const category = await guild.channels.create({
      name: `${jobName}`,
      type: ChannelType.GuildCategory,
    });
    const channel = await guild.channels.create({
      name: `${jobName}_Channel`,
      type: ChannelType.GuildForum,
      parent: category,
    });

    await interaction.reply(
      `Created category ${category} and Created channel: ${channel}`,
    );
  }
}
