import { TalentNode } from "@/models/talents/TalentNode";
import { TalentTree } from "@/models/talents/TalentTree";
import { mdiAccountHardHat, mdiSwordCross, mdiTargetAccount } from "@mdi/js";
import Decimal from "break_eternity.js";

export const upTree = new TalentTree(
  new TalentTree(
    new TalentTree(
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode(
          "Increase damage by 1%",
          "Increase damage by 1%",
          new Decimal(1),
          mdiSwordCross,
          () => {}
        )
      ),
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode(
          "Increases workers efficiency by 10%",
          "Increases workers efficiency by 10%",
          new Decimal(1),
          mdiAccountHardHat,
          () => {}
        )
      ),
      new TalentNode(
        "Decreases enemy damage by 1%",
        "Decreases enemy damage by 1%",
        new Decimal(1),
        mdiTargetAccount,
        () => {}
      )
    ),
    new TalentTree(
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode(
          "Increase damage by 1%",
          "Increase damage by 1%",
          new Decimal(1),
          mdiSwordCross,
          () => {}
        )
      ),
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode(
          "Increase damage by 1%",
          "Increase damage by 1%",
          new Decimal(1),
          mdiSwordCross,
          () => {}
        )
      ),
      new TalentNode(
        "Increase damage by 1%",
        "Increase damage by 1%",
        new Decimal(1),
        mdiSwordCross,
        () => {}
      )
    ),
    new TalentNode(
      "Increase damage by 1%",
      "Increase damage by 1%",
      new Decimal(1),
      mdiSwordCross,
      () => {}
    )
  ),
  new TalentTree(
    new TalentTree(
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode(
          "Increase damage by 1%",
          "Increase damage by 1%",
          new Decimal(1),
          mdiSwordCross,
          () => {}
        )
      ),
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode(
          "Increase damage by 1%",
          "Increase damage by 1%",
          new Decimal(1),
          mdiSwordCross,
          () => {}
        )
      ),
      new TalentNode(
        "Increase damage by 1%",
        "Increase damage by 1%",
        new Decimal(1),
        mdiSwordCross,
        () => {}
      )
    ),
    new TalentTree(
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode(
          "Increase damage by 1%",
          "Increase damage by 1%",
          new Decimal(1),
          mdiSwordCross,
          () => {}
        )
      ),
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode(
          "Increase damage by 1%",
          "Increase damage by 1%",
          new Decimal(1),
          mdiSwordCross,
          () => {}
        )
      ),
      new TalentNode(
        "Increase damage by 1%",
        "Increase damage by 1%",
        new Decimal(1),
        mdiSwordCross,
        () => {}
      )
    ),
    new TalentNode(
      "Decreases enemy damage by 1%",
      "Decreases enemy damage by 1%",
      new Decimal(1),
      mdiTargetAccount,
      () => {}
    )
  ),
  new TalentNode(
    "Increases workers efficiency by 10%",
    "Increases workers efficiency by 10%",
    new Decimal(1),
    mdiAccountHardHat,
    () => {}
  )
);
