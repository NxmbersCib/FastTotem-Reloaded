import { Player } from "@minecraft/server";
import { SwappableItem } from "../interface/SwappableItem";
import FastTotem from "../FastTotem";

export class FastTotemManager {
    private readonly SWAPPABLES: Map<string, SwappableItem> = new Map();

    public registerSwappable(item: SwappableItem) {
        this.SWAPPABLES.set(item.typeId, item);
    }

    public swappableEnabled(player: Player, swappable: SwappableItem | string) {
        let identifier: string;

        if (typeof swappable === "string") {
            identifier = FastTotem.PLUGIN_ID + swappable;
        } else {
            identifier = FastTotem.PLUGIN_ID + swappable.typeId;
        }

        const enabled =
            (player.getDynamicProperty(
                identifier + "::swappable",
            ) as boolean) ?? true;

        return enabled;
    }

    public toggleSwappable(
        player: Player,
        swappable: SwappableItem | string,
        toggle?: boolean,
    ) {
        let identifier: string;

        if (typeof swappable === "string") {
            identifier = FastTotem.PLUGIN_ID + swappable;
        } else {
            identifier = FastTotem.PLUGIN_ID + swappable.typeId;
        }

        player.setDynamicProperty(
            identifier + "::swappable",
            toggle ?? !this.swappableEnabled(player, swappable),
        );
    }
}
