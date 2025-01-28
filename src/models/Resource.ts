import type { RESOURCE } from "../types";
import { BigNumber } from "./BigNumber";


export class Resource {
    name: RESOURCE
    amount: BigNumber
    maxAmount: BigNumber

    constructor(name: RESOURCE) {
        this.name = name
        this.amount = BigNumber.fromString("0")
        this.maxAmount = BigNumber.fromString("200")
    }

    addAmount(amount: BigNumber) {
        if (this.amount.compare(this.maxAmount) >= 0) {
            this.amount = this.maxAmount
        } else {
            this.amount.add(amount.numbers)
        }
    }
    deductAmount(amount: BigNumber) {
        this.amount.subtract(amount.numbers)
    }
    upgradeMaxAmount(multiplier: number) {
        this.maxAmount.multiplyBigNumber(BigNumber.fromString(multiplier.toString()))
    }

    canAfford(cost: BigNumber): boolean {
        return this.amount.compare(cost) >= 0
    }
}