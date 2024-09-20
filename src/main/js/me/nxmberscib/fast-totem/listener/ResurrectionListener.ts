import { world } from "@minecraft/server";
import {
    Color,
    EntityResurrectBeforeEvent,
    EventHandler,
    FormatUtil,
} from "@teseractmcs/server-api";

export class ResurrectionListener {
    @EventHandler
    private onResurrection({ entity: player }: EntityResurrectBeforeEvent) {
        if (!player.isPlayer()) {
            return;
        }

        world.sendMessage(
            FormatUtil.placeHolder(
                Color.MinecoinGold + "%1% has used a totem.",
                player.name,
            ),
        );
    }
}
