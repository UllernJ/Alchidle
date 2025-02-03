import {
  badGnomeIcon,
  golemIcon,
  troglodyteIcon,
  trollIcon,
  vampireIcon,
  witchIcon,
} from "../icons/icons";

export const monsters = [
  {
    name: "Gnome",
    icon: badGnomeIcon,
  },
  {
    name: "Troll",
    icon: trollIcon,
  },
  {
    name: "Vampire",
    icon: vampireIcon,
  },
  {
    name: "Witch",
    icon: witchIcon,
  },
  {
    name: "Golem",
    icon: golemIcon,
  },
  {
    name: "Troglodyte",
    icon: troglodyteIcon,
  },
];

export const getIconByName = (name: string) => {
  return monsters.find((monster) => monster.name === name)?.icon ?? "";
};
