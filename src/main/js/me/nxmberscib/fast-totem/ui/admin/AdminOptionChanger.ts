import { Player, world } from "@minecraft/server";
import {
    Button1,
    Button2,
    Canceled,
    Color,
    FormTitle,
    MessageForm,
} from "@teseractmcs/server-api";
import FastTotem from "../../FastTotem";
import { MainForm } from "../MainForm";
import { Alerts } from "../../util/enum/Alerts";
import { AdminForm } from "./AdminForm";

@MessageForm
@FormTitle(function (player: Player) {
    return "Globally Toggle: " + this.alertDisplay;
})
export class AdminOptionChanger {
    public constructor(
        private readonly alertId: string,
        private readonly alertDisplay: string,
    ) {}
    private broadcastChangeMessage(
        change: "enabled" | "disabled",
        changer: Player,
    ) {
        for (const online of world.getPlayers()) {
            if (
                !online.isOp() &&
                !online.hasTag("Admin") &&
                !online.hasTag("admin")
            ) {
                online.sendMessage(
                    (change == "disabled" ? Color.Red : Color.Emerald) +
                        this.alertDisplay +
                        " has been globally " +
                        change +
                        "  by " +
                        changer,
                );
            }
        }
    }

    @Button2(Color.Emerald + "Enable")
    private onEnabled(player: Player) {
        FastTotem.getManager().toggleAlert(this.alertId as Alerts, true);

        player.playSound("note.pling");
        player.sendMessage(
            Color.Emerald + this.alertDisplay + " has been globally enabled.",
        );

        this.broadcastChangeMessage("enabled", player);
        return player.sendForm(new AdminForm());
    }

    @Button1(Color.Redstone + "Disable")
    private onDisabled(player: Player) {
        FastTotem.getManager().toggleAlert(this.alertId as Alerts, false);

        player.playSound("note.pling");
        this.broadcastChangeMessage("disabled", player);

        return player.sendForm(new AdminForm());
    }

    @Canceled
    private onCanceled(player: Player) {
        return player.sendForm(new AdminForm());
    }
}
