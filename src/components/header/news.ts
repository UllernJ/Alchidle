export const patchNotes = [
  {
    version: "0.1.0",
    date: "13.02.2025",
    changes: [
      "You can now see track your talents after reincarnation.",
      "Added a new building: 'Barracks' (Increases attack, defence, health and regen by 1%)",
      "Fixed decrease cost talent for blacksmithing not working.",
      "Fixed bug for price calculation for gear.",
      "Fixed various bugs with talents, save import and resetting the game.",
      "dev: implemented a new state management system for the game. (should have no impact on the game)",
    ]
      },
  {
    version: "0.0.4",
    date: "12.02.2025",
    changes: [
      "Fix formatting issue with trainers and priests.",
      "Fix talent points calculation & a bug where talent points would stay at 0 when reaching map 10.",
      "Monsters true max health is now displayed when refresh, so it doesnt look like its always 100% health when its not.",
      "Fixed import bug causing importing the same save file over and over again resulting in huge multipliers.",
    ],
  },

  {
    version: "0.0.3",
    date: "11.02.2025",
    changes: [
      "Fixed infusion restore from save bug.",
      "Added new talent for reincarnation: attack speed (increases attack speed 10% per level)",
      "You now gain talent points for completing maps beyond map 10.",
    ],
  },
  {
    version: "0.0.2",
    date: "10.02.2025",
    changes: [
      "Balanced the drops from monsters.",
      "Fixed bug that caused the game to crash when the player tried to enter a dungeon that was already completed, allowing the player to skip maps.",
      "Instead of waiting the full 60 seconds when defeated in a dungeon, the player will have to wait until full health.",
      "Various UI enhancements.",
    ],
  },
  {
    version: "0.0.1",
    date: "07.02.2025",
    changes: [
      "Ensured progress continues even when the tab is not active",
      "Fixed bug that allowed skipping maps infinitely.",
      "Various UI enhancements.",
    ],
  },
  {
    version: "0.0.0",
    date: "06.02.2025",
    changes: [
      "Initial release of my prototype!",
      "I've been working on this project for a while now and I'm excited to finally share it with you.",
      "I hope you enjoy playing the game as much as I enjoyed making it.",
      "Please let me know if you encounter any bugs or have any feedback.",
      "Thank you for playing!",
      "Contact me on discord: @ullern",
    ],
  },
];
