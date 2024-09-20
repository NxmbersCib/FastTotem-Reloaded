import { ItemUseBeforeEvent } from "@minecraft/server";
import { EventHandler } from "@teseractmcs/server-api";
import FastTotem from "../FastTotem";

export class SwappingListener {
    private readonly SWAPPABLE_ITEMS: string[] = [
        "minecraft:totem_of_undying",
        "minecraft:shield",
        "minecraft:arrow",
    ];

    @EventHandler
    private async onItemSwapped({
        itemStack,
        source: player,
    }: ItemUseBeforeEvent) {
        if (
            !this.SWAPPABLE_ITEMS.includes(itemStack.typeId) ||
            !FastTotem.getPlayerManager().swappableEnabled(player, itemStack.typeId)
        ) {
            return;
        }

        const inventory = player.getInventory();
        const offHand = inventory.getOffHandItemStack();

        await null;

        inventory.setMainHandItemStack(offHand);
        inventory.setOffHandItemStack(itemStack);
    }
}
