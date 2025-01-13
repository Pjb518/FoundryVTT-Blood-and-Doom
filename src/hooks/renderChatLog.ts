import getActionRollButtons from "./helpers/getActionRollButtons.ts";
import getDamageRollButtons from "./helpers/getDamageRollButtons.ts";
import getDoomRollButtons from "./helpers/getDoomRollButtons.ts";
import localize from "#utils/localize.ts";
import toggleRollInterfaceTab from "#utils/toggleRollInterfaceTab.ts";

export default function renderChatLog(_, [html]) {
  const chatForm = html.querySelector("#chat-form")

  const actionButtonWrapper = getActionRollButtons();
  const damageButtonWrapper = getDamageRollButtons();
  const doomButtonWrapper = getDoomRollButtons();

  const tabButtonWrapper = document.createElement("section");
  tabButtonWrapper.classList.add("bnd-tab-button-wrapper")

  const tabButtons = ["action", "damage", "doom"].map(tab => {
    const button = document.createElement("button");
    button.classList.add("bnd-tab-button");

    if (tab === "action") {
      button.classList.add("bnd-tab-button--active");
    }

    button.innerText = localize(`BLOOD_AND_DOOM.rollTabs.${tab}`)
    button.dataset.bndTab = tab;
    button.addEventListener("click", toggleRollInterfaceTab);

    return button;
  })

  tabButtonWrapper.append(...tabButtons);

  chatForm?.after(actionButtonWrapper, damageButtonWrapper, doomButtonWrapper, tabButtonWrapper);
}
