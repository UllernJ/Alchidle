import { TalentNode } from "@/models/talents/TalentNode";
import { TalentTree } from "@/models/talents/TalentTree";

export const upTree = new TalentTree(
  new TalentTree(
    new TalentTree(
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode()
      ),
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode()
      ),
      new TalentNode()
    ),
    new TalentTree(
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode()
      ),
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode()
      ),
      new TalentNode()
    ),
    new TalentNode()
  ),
  new TalentTree(
    new TalentTree(
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode()
      ),
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode()
      ),
      new TalentNode()
    ),
    new TalentTree(
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode()
      ),
      new TalentTree(
        new TalentTree(null, null, null),
        new TalentTree(null, null, null),
        new TalentNode()
      ),
      new TalentNode()
    ),
    new TalentNode()
  ),
  new TalentNode()
);
