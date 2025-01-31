import type { TalentNode } from "@/models/talents/TalentNode";

export class TalentTree {
  left: TalentTree | null;
  right: TalentTree | null;
  value: TalentNode | null;
  constructor(
    left: TalentTree | null,
    right: TalentTree | null,
    value: TalentNode | null
  ) {
    this.left = left;
    this.right = right;
    this.value = value;
  }
}
