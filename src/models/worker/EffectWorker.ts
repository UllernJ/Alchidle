import type { RESOURCE } from "../../types";
import { BigNumber } from "../BigNumber";
import { BaseWorker } from "./BaseWorker";

export class EffectWorker extends BaseWorker {
    produce: {
        rate: BigNumber;
        resource: EFFECT_RESOURCE;
    }
    constructor(
        name: string,
        produce: {
            rate: BigNumber;
            resource: EFFECT_RESOURCE;
        },
        cost: {
        resource: RESOURCE;
        value: BigNumber;
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
        this.produce.rate.multiply([multiplier]);
        this.description = `Increases ${this.produce.resource} by ${this.produce.rate}.`;
    }

    getProduction() {
        const temp = BigNumber.fromString(this.produce.rate.toString());
        temp.multiply([this.numberOfWorkers]);
        return temp;
    }
}

export enum EFFECT_RESOURCE {
    REGEN = "regen",
    DEFENCE = "defence"
}