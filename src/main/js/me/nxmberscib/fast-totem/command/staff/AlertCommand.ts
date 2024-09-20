import { Player } from "@minecraft/server";
import { CommandAlias, Default, Permission } from "@teseractmcs/server-api";

@CommandAlias("alert")
@Permission((player) => {
    return player.hasTag("Admin") || player.hasTag("admin") || player.isOp();
})
export class AlertCommand {
    @Default
    private default(sender: Player) {
        
    }
}
