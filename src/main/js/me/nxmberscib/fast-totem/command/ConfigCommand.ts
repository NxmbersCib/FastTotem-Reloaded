import { Player } from "@minecraft/server";
import { CommandAlias, Default } from "@teseractmcs/server-api";
import { MainForm } from "../ui/MainForm";

@CommandAlias("config")
export class ConfigCommand {
    @Default
    private config(player: Player) {
        player.sendForm(new MainForm());
    }
}
