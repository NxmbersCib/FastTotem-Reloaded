import { Player } from "@minecraft/server";
import {
    ActionForm,
    Color,
    FormButton,
    FormTitle,
    OnActionFormInit,
} from "@teseractmcs/server-api";
import FastTotem from "../FastTotem";
import { OptionChanger } from "./OptionChanger";
import { Alerts } from "../util/enum/Alerts";
import { AlertChanger } from "./AlertChanger";
import { AdminForm } from "./admin/AdminForm";

@ActionForm
@FormTitle((player: Player) => {
    return player.nameTag + "'s config";
})
@OnActionFormInit(function (data, player) {
    if (!player.isOp() && !player.hasTag("Admin") && !player.hasTag("admin")) {
        return;
    }
    data.appendButton(
        (player: Player, selection: number) => {
            player.sendForm(new AdminForm())
        },
        "Admin Settings",
        "textures/ui/dev_glyph_color",
    );
})
export class MainForm {
    private formatEnabled(player: Player, item: string) {
        return FastTotem.getPlayerManager().swappableEnabled(player, item)
            ? Color.Emerald + "Enabled"
            : Color.Redstone + "Disabled";
    }
    private formatAlert(player: Player, item: string) {
        FastTotem.LOGGER.info(item)
        return FastTotem.getPlayerManager().alertEnabled(player, item as Alerts)
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
        player.sendForm(new OptionChanger("minecraft:arrow", "Arrow Swapping"));
    }

    @FormButton<MainForm>(function (player) {
        return (
            "Resurrection Alert\n" +
            this.formatAlert(player, Alerts.Resurrection)
        );
    }, "textures/items/villagebell")
    private resurrectAlert(player: Player) {
        player.sendForm(new AlertChanger(Alerts.Resurrection, "Resurrection"));
    }

    @FormButton<MainForm>(function (player) {
        return (
            "Achievement Alert\n" + this.formatAlert(player, Alerts.Achievement)
        );
    }, "textures/items/emerald")
    private achievementAlert(player: Player) {
        player.sendForm(new AlertChanger(Alerts.Achievement, "Achievement"));
    }
}
