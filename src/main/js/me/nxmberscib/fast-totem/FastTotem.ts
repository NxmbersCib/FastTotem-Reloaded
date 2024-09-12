import { Player, WorldInitializeBeforeEvent } from "@minecraft/server";
import {
    Identifier,
    Logger,
    Teseract,
    TeseractPlugin,
} from "@teseractmcs/server-api";
import { SwappingListener } from "./listener/SwappingListener";
import ResurrectionListener from "./listener/ResurrectionListener";
import { SwappableItem } from "./interface/SwappableItem";
import { ConfigCommand } from "./command/ConfigCommand";

export default class FastTotem extends TeseractPlugin {
    public static override readonly PLUGIN_ID: string = "fasttotem";
    public static readonly LOGGER: Logger = Teseract.getLogger(this.PLUGIN_ID);
    private static readonly SWAPPABLES: Map<string, SwappableItem> = new Map();

    public static registerSwappable(item: SwappableItem) {
        this.SWAPPABLES.set(item.typeId, item);
    }

    public static swappableEnabled(
        player: Player,
        swappable: SwappableItem | string,
    ) {
        let identifier: string;

        if (typeof swappable === "string") {
            identifier = this.PLUGIN_ID + swappable;
        } else {
            identifier = this.PLUGIN_ID + swappable.typeId;
        }

        const enabled =
            (player.getDynamicProperty(
                identifier + "::swappable",
            ) as boolean) ?? true;

        return enabled;
    }

    public static toggleSwappable(
        player: Player,
        swappable: SwappableItem | string,
        toggle?: boolean,
    ) {
        let identifier: string;

        if (typeof swappable === "string") {
            identifier = this.PLUGIN_ID + swappable;
        } else {
            identifier = this.PLUGIN_ID + swappable.typeId;
        }

        player.setDynamicProperty(
            identifier + "::swappable",
            toggle ?? !this.swappableEnabled(player, swappable),
        );
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
