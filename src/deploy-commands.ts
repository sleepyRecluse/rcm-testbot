import { REST, Routes } from "discord.js";
import { config } from "./config";
import * as ping from "./commands/ping";
import * as createJob from "./commands/createJob";
import * as moveJob from "./commands/moveJob";

const commands: any[] = [ping.data, createJob.data, moveJob.data];

const rest: REST = new REST({ version: "10" }).setToken(config.token!);

(async () => {
  try {
    console.log("Deploying commands...");

    await rest.put(
      Routes.applicationGuildCommands(config.clientId!, config.guildId!),
      { body: commands },
    );

    console.log("Commands deployed!");
  } catch (error) {
    console.error(error);
  }
})();
