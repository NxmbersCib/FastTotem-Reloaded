import { world } from "@minecraft/server";
import {
    Color,
    EntityResurrectEvent,
    EventHandler,
    FormatUtil,
} from "@teseractmcs/server-api";

export default class ResurrectionListener {
    @EventHandler
    private onResurrection({ entity: player }: EntityResurrectEvent) {
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
