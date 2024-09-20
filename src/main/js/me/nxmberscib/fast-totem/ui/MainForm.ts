import { Player } from "@minecraft/server";
import {
    ActionForm,
    Color,
    FormButton,
    FormTitle,
} from "@teseractmcs/server-api";
import FastTotem from "../FastTotem";
import { OptionChanger } from "./OptionChanger";

@ActionForm
@FormTitle((player: Player) => {
    return player.nameTag + "'s config";
})
export class MainForm {
    private formatEnabled(player: Player, swappable: string) {
        return FastTotem.getManager().swappableEnabled(player, swappable)
            ? Color.Emerald + "Enabled"
            : Color.Redstone + "Disabled";
    }
    @FormButton<MainForm>(function (player: Player) {
        return (
            "Totem Swapping\n" +
            this.formatEnabled(player, "minecraft:totem_of_undying")
        );
    }, "textures/items/totem")
    private totemConfig(player: Player) {
        player.sendForm(
            new OptionChanger("minecraft:totem_of_undying", "Totem Swapping"),
        );
    }

    @FormButton<MainForm>(function (player) {
        return (
            "Shield Swapping\n" + this.formatEnabled(player, "minecraft:shield")
        );
    }, "textures/ui/resistance_effect")
    private shieldConfig(player: Player) {
        player.sendForm(
            new OptionChanger("minecraft:shield", "Shield Swapping"),
        );
    }

    @FormButton<MainForm>(function (player) {
        return (
            "Arrow Swapping\n" + this.formatEnabled(player, "minecraft:arrow")
        );
    }, "textures/items/arrow")
    private arrowSwapping(player: Player) {
        player.sendForm(
            new OptionChanger("minecraft:arrow", "Arrow Swapping"),
        );
    }
}
