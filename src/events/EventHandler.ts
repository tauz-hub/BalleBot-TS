import path from "path";
import { readdirSync } from "fs";
import { EventBase } from "../structures/Event";
import { Ballebot } from "../structures/Client";

async function EventHandler(): Promise<void> {
  return new Promise((resolve) => {
    const eventFolders = ["client", "guilds"];

    eventFolders.forEach(async (folder) => {
      const folderPath = path.resolve(
        path.dirname(""),
        "src",
        "events",
        folder
      );

      const eventFiles = readdirSync(folderPath).filter(
        (file) => file.endsWith(".event.js") || file.endsWith(".event.ts")
      );

      eventFiles.forEach(async (file) => {
        const instanceEvent: EventBase = (await import(`./${folder}/${file}`))
          .default;

        const ballebot = Ballebot.getInstance();
        ballebot.on(instanceEvent.event, instanceEvent.run);
      });
    });

    resolve();
  });
}

export default EventHandler;
