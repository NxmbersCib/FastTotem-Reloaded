import { world } from "@minecraft/server";
import {
    Color,
    EntityResurrectBeforeEvent,
    EventHandler,
    FormatUtil,
} from "@teseractmcs/server-api";
import FastTotem from "../FastTotem";
import { Alerts } from "../util/enum/Alerts";

export class ResurrectionListener {
    @EventHandler
    private onResurrection({ entity: player }: EntityResurrectBeforeEvent) {
        if (!player.isPlayer()) {
            return;
        }

        const unlockedAchievement =
            FastTotem.getPlayerManager().unlockedAchievement(player);

        for (const online of world.getPlayers()) {
            if (
                !FastTotem.getPlayerManager().alertEnabled(
                    online,
                    Alerts.Resurrection,
                ) ||
                !FastTotem.getManager().alertEnabled(Alerts.Resurrection)
            ) {
                continue;
            }

            online.sendMessage(
                FormatUtil.placeHolder(
                    Color.MinecoinGold + "%1% has used a totem.",
                    player.name,
                ),
            );
        }

        if (
            unlockedAchievement ||
            !FastTotem.getManager().alertEnabled(Alerts.Achievement)
        ) {
            return;
        }

        for (const online of world.getPlayers()) {
            if (
                FastTotem.getPlayerManager().alertEnabled(
                    player,
                    Alerts.Achievement,
                )
            ) {
                online.sendMessage(
                    FormatUtil.placeHolder(
                        "%1% has reached the goal " +
                            Color.Green +
                            "[Postmortal]",
                        player.name,
                    ),
                );
            }
        }

        FastTotem.getPlayerManager().setAchievement(player, true);
    }
}
