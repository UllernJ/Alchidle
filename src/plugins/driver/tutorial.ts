import { driver } from "driver.js";
import "@/plugins/driver/custom-theme.css";
import "driver.js/dist/driver.css";
import { useResource } from "@/composable/useResource";
import { TAB_STATE, useTab } from "@/composable/useTab";
import { useWorkersStore } from "@/stores/useWorkerStore";

const driverObj = driver({
  animate: true,
  showProgress: true,
  showButtons: ["next", "previous", "close"],
  smoothScroll: false,
  popoverClass: "driverjs-theme",
  steps: [
    {
      element: ".root",
      popover: {
        title: "Welcome to the tutorial!",
        description:
          "This tutorial will guide you through the basic features of the game.",
        side: "bottom",
        align: "center",
      },
    },
    {
      element: ".resources-container",
      popover: {
        title: "Resources",
        description: "Here you can find all the resources you need to gather.",
        side: "top",
        align: "center",
        disableButtons: ["previous"],
      },
    },
    {
      element: ".resources-container .resource-container",
      popover: {
        title: "Gathering your first resource",
        description:
          'Lets start with gathering some money to hire your first workers. <br> Click on the <b>"Gather"</b> button to start gathering money.',
        side: "top",
        align: "center",
        onNextClick: () => {
          const { resources } = useResource();
          if (resources.Money.value.amount.gte(1)) {
            driverObj.moveNext();
          }
        },
      },
    },
    {
      element: ".worker-list",
      popover: {
        title: "Workers",
        description:
          "Here you can hire workers to gather resources, boost stats and more.",
        side: "top",
        align: "center",
      },
    },
    {
      element: ".worker-list",
      popover: {
        title: "Hiring your first worker",
        description:
          'Lets start by hiring your first worker. <br> Click on the "Banker" to hire your first worker.',
        side: "top",
        align: "center",
        onNextClick: () => {
          const workerStore = useWorkersStore();
          if (workerStore.resourceWorkersList.banker.numberOfWorkers.gte(1)) {
            const stateContent = document.querySelector(".state-content");
            if (stateContent) {
              stateContent.scrollTop = stateContent.scrollHeight;
            }
            driverObj.moveNext();
          }
        },
      },
    },
    {
      element: ".building-list",
      popover: {
        title: "Buildings",
        description:
          "Here you can build buildings to boost resource space, production and more.",
        side: "top",
        align: "center",
      },
    },
    {
      element: ".state-list .state-item:nth-child(4)",
      popover: {
        title: "Research & tabs",
        description:
          "Here you can research new technologies and you can switch between tabs to access different features. <br> Click on the Research tab to continue.",
        side: "top",
        align: "center",
        onNextClick: () => {
          const { currentState } = useTab();
          if (currentState.value === TAB_STATE.RESEARCH) {
            driverObj.moveNext();
          }
        },
      },
    },
    {
      element: ".Player",
      popover: {
        title: "Player section",
        description: "Here you can find your player stats and multipliers.",
        side: "top",
        align: "center",
      },
    },
  ],
});

export const startTutorial = () => {
  driverObj.drive();
};
