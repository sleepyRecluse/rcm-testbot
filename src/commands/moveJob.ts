import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  createChannel,
  ChannelType,
  ForumChannel,
  PermissionFlagsBits,
  Guild,
} from "discord.js";
import { config } from "../config";
import { formatString } from "./util";

export const data: any = new SlashCommandBuilder()
  .setName("move-channel")
  .setDescription("Moves channel to archived channels")
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

  if (guild) {
    const channelNames: ForumChannel | undefined = guild.channels.cache
      .filter((c) => c.type === ChannelType.GuildForum)
      .find(
        (c) =>
          formatString(c.name) ===
          `${formatString(jobId)}${formatString(jobName)}`,
      );

    if (channelNames) {
      await channelNames
        .edit({
          parent: config.archiveId,
          permissionOverwrites: [
            {
              id: guild.roles.everyone.id,
              deny: [PermissionFlagsBits.ViewChannel],
            },
          ],
        })
        .catch(console.error);
    }

    await interaction.reply(
      `Archived the following job channel: ${channelNames}`,
    );
  }
}
