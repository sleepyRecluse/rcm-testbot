import { Client, Events, GatewayIntentBits } from "discord.js";
import { config } from "./config";
import * as ping from "./commands/ping";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, () => {
  if (client.user != null) console.log(`Logged in as ${client.user.username}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await ping.execute(interaction);
  }
});

client.login(config.token);
