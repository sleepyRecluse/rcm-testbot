import dotenv from "dotenv";

dotenv.config();

export const config = {
  token: process.env.DISCORD_TOKEN!,
  clientId: process.env.APP_ID!,
  guildId: process.env.GUILD_ID!,
};
