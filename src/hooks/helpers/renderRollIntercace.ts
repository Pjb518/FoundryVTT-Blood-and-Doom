import getActionRollButtons from "./getActionRollButtons.ts";
import getDamageRollButtons from "./getDamageRollButtons.ts";
import getDoomRollButtons from "./getDoomRollButtons.ts";
import localize from "#utils/localize.ts";
import toggleRollInterfaceTab from "#utils/toggleRollInterfaceTab.ts";

export function renderRollInterface() {
  const chatMessage = document.querySelector("#chat-message");
  const rollInterfaceWrapper = document.createElement("section");
  rollInterfaceWrapper.id = "roll-interface-wrapper";

  const actionButtonWrapper = getActionRollButtons();
  const damageButtonWrapper = getDamageRollButtons();
  const doomButtonWrapper = getDoomRollButtons();

  const tabButtonWrapper = document.createElement("section");
  tabButtonWrapper.classList.add("bnd-tab-button-wrapper");

  const tabButtons = ["action", "damage", "doom"].map((tab) => {
    const button = document.createElement("button");
    button.classList.add("bnd-tab-button");

    if (tab === "action") {
      button.classList.add("bnd-tab-button--active");
    }

    button.innerText = localize(`BLOOD_AND_DOOM.rollTabs.${tab}`);
    button.type = "button";
    button.dataset.bndTab = tab;
    button.addEventListener("click", toggleRollInterfaceTab);

    return button;
  });

  tabButtonWrapper.append(...tabButtons);

  rollInterfaceWrapper?.append(
    actionButtonWrapper,
    damageButtonWrapper,
    doomButtonWrapper,
    tabButtonWrapper,
  );

  chatMessage?.after(rollInterfaceWrapper);
}
