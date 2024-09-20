import { world } from "@minecraft/server";
import { SwappableItem } from "../util/interface/SwappableItem";
import { Alerts } from "../util/enum/Alerts";

export class FastTotemManager {
    private readonly SWAPPABLES: Map<string, SwappableItem> = new Map();

    public registerSwappable(item: SwappableItem) {
        this.SWAPPABLES.set(item.typeId, item);
    }

    public getAlert(alert: Alerts) {
        return world.getDynamicProperty(alert);
    }

    public setAlert(alert: Alerts, alertString: string) {
        world.setDynamicProperty(alert, alertString);
    }

    public toggleAlert(alert: Alerts, enabled?: boolean) {
        let isEnabled = enabled ?? this.alertEnabled(alert);

        world.setDynamicProperty(alert, isEnabled);
    }

    public alertEnabled(alert: Alerts): boolean {
        return (world.getDynamicProperty(alert) ?? true) as boolean;
    }
}
