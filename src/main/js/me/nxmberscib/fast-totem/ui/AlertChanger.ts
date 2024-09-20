import FastTotem from "../FastTotem";
import { Player } from "@minecraft/server";
import {
    Button1,
    Button2,
    Canceled,
    Color,
    FormTitle,
    MessageForm,
} from "@teseractmcs/server-api";
import { MainForm } from "./MainForm";
import { Alerts } from "../util/enum/Alerts";

@MessageForm
@FormTitle(function (player: Player) {
    return "Toggle: " + this.alertDisplay + " alert";
})
export class AlertChanger {
    public constructor(
        private readonly alertId: string,
        private readonly alertDisplay: string,
    ) {}

    @Button2(Color.Emerald + "Enable")
    private onEnabled(player: Player) {
        FastTotem.getPlayerManager().toggleAlert(
            player,
            this.alertId as Alerts,
            true,
        );
        player.playSound("note.pling");
        player.sendMessage(
            Color.Emerald + this.alertDisplay + " alert has been enabled.",
        );
        return player.sendForm(new MainForm());
    }

    @Button1(Color.Redstone + "Disable")
    private onDisabled(player: Player) {
        FastTotem.getPlayerManager().toggleAlert(
            player,
            this.alertId as Alerts,
            false,
        );
        player.playSound("note.pling");
        player.sendMessage(
            Color.Redstone + this.alertDisplay + " alert has been disabled.",
        );
        return player.sendForm(new MainForm());
    }

    @Canceled
    private onCanceled(player: Player) {
        return player.sendForm(new MainForm());
    }
}
