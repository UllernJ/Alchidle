import type { RESOURCE } from "../../types";
import { BaseWorker } from "./BaseWorker";

export class EffectWorker extends BaseWorker {
    produce: {
        rate: number;
        resource: EFFECT_RESOURCE;
    }
    constructor(
        name: string,
        produce: {
            rate: number;
            resource: EFFECT_RESOURCE;
        },
        cost: {
        resource: RESOURCE;
        value: number;
        },
        description: string,
        icon: string,
        multiplier: number,
        requirement?: () => boolean
    ) {
        super(name, cost, description, icon, multiplier, requirement);
        this.produce = produce;
        this.description = `Increases ${this.produce.resource} by ${this.produce.rate}.`;
    }

    upgrade(multiplier: number): void {
        this.produce.rate *= multiplier;
    }
}

export enum EFFECT_RESOURCE {
    REGEN = "regen",
    DEFENCE = "defence"
}