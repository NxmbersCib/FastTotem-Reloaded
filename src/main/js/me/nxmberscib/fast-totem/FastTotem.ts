import { WorldInitializeBeforeEvent } from "@minecraft/server";
import { Logger, Teseract, TeseractPlugin } from "@teseractmcs/server-api";
import { SwappingListener } from "./listener/SwappingListener";
import { ResurrectionListener } from "./listener/ResurrectionListener";
import { ConfigCommand } from "./command/ConfigCommand";
import { FastTotemManager } from "./manager/FastTotemManager";
import { PlayerManager } from "./manager/PlayerManager";

export default class FastTotem extends TeseractPlugin {
    public static override readonly PLUGIN_ID: string = "fasttotem";
    public static readonly LOGGER: Logger = Teseract.getLogger(this.PLUGIN_ID);
    private static readonly manager: FastTotemManager = new FastTotemManager();
    private static readonly playerManager: PlayerManager = new PlayerManager();

    public static getManager() {
        return this.manager;
    }
    public static getPlayerManager() {
        return this.playerManager;
    }

    public override onLoaded() {
        Teseract.getEventManager().registerEvents(
            new SwappingListener(),
            new ResurrectionListener(),
        );
        Teseract.getCommandManager().registerCommands(new ConfigCommand());
        LOGGER.log("Fast Totem loaded");
    }

    public override onEnabled(initializer: WorldInitializeBeforeEvent) {}
}
