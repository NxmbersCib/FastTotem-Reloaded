import { Player } from "@minecraft/server";
import {
    Button1,
    Button2,
    Canceled,
    Color,
    FormTitle,
    MessageForm,
} from "@teseractmcs/server-api";
import FastTotem from "../FastTotem";
import { MainForm } from "./MainForm";

@MessageForm
@FormTitle(function (player: Player) {
    return "Toggle: " + this.optionDisplay;
})
export class OptionChanger {
    public constructor(
        private optionId: string,
        private optionDisplay: string,
    ) {}

    @Button2(Color.Emerald + "Enable")
    private onEnabled(player: Player) {
        FastTotem.toggleSwappable(player, this.optionId, true);
        return player.sendForm(new MainForm());
    }

    @Button1(Color.Redstone + "Disable")
    private onDisabled(player: Player) {
        FastTotem.toggleSwappable(player, this.optionId, false);
        return player.sendForm(new MainForm());
    }

    @Canceled
    private onCanceled(player: Player) {
        return player.sendForm(new MainForm());
    }
}
