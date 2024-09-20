import FastTotem from "../FastTotem";
import { Player } from "@minecraft/server";
import { SwappableItem } from "../util/interface/SwappableItem";
import { Alerts } from "../util/enum/Alerts";

export class PlayerManager {
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

    public toggleAlert(player: Player, alert: Alerts, enabled?: boolean) {
        let isEnabled = enabled ?? this.alertEnabled(player, alert);

        player.setDynamicProperty(alert, isEnabled);
    }

    public alertEnabled(player: Player, alert: Alerts): boolean {
        return (player.getDynamicProperty(alert) ?? true) as boolean;
    }

    public setAchievement(player: Player, unlocked: boolean = true) {
        player.setDynamicProperty("fasttotem:achievement", unlocked);
    }

    public unlockedAchievement(player: Player): boolean {
        return (player.getDynamicProperty("fasttotem:achievement") ??
            false) as boolean;
    }
}
