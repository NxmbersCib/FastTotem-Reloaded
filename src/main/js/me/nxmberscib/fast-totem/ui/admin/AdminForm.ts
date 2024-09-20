import { Player } from "@minecraft/server";
import {
    ActionForm,
    Canceled,
    Color,
    FormButton,
    FormTitle,
} from "@teseractmcs/server-api";
import FastTotem from "../../FastTotem";
import { Alerts } from "../../util/enum/Alerts";
import { MainForm } from "../MainForm";
import { AdminOptionChanger } from "./AdminOptionChanger";

@ActionForm
@FormTitle("Admin settings")
export class AdminForm {
    private formatAlert(item: string) {
        return FastTotem.getManager().alertEnabled(item as Alerts)
            ? Color.Emerald + "Enabled"
            : Color.Redstone + "Disabled";
    }
    // public constructor()
    @FormButton<AdminForm>(function (player: Player) {
        return (
            "Global Resurrection Alert\n" +
            this.formatAlert(Alerts.Resurrection)
        );
    }, "textures/items/villagebell")
    private resurrection(player: Player) {
        player.sendForm(
            new AdminOptionChanger(Alerts.Resurrection, "Resurrection"),
        );
    }

    @FormButton(function (player: Player) {
        return (
            "Global Achievement Alert\n" + this.formatAlert(Alerts.Achievement)
        );
    }, "textures/items/emerald")
    private achievement(player: Player) {
        player.sendForm(
            new AdminOptionChanger(Alerts.Achievement, "Achievement"),
        );
    }

    @Canceled
    private canceled(player: Player) {
        player.sendForm(new MainForm());
    }
}
