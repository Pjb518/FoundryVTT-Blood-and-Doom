import "./scss/main.scss";

import activateAbstractSidebarTab from "./hooks/activateAbstractSidebarTab.ts";
import collapseSidebar from "./hooks/collapseSidebar.ts";
import i18nInit from "./hooks/i18nInit.ts";
import init from "./hooks/init.ts";
import ready from "./hooks/ready.ts";
import renderChatMessage from "./hooks/renderChatMessage.ts";
import renderCombatTracker from "./hooks/renderCombatTracker.ts";

Hooks.once("init", init);
Hooks.once("i18nInit", i18nInit);
Hooks.once("ready", ready);

Hooks.on("activateAbstractSidebarTab", activateAbstractSidebarTab);

Hooks.on("activateAbstractSidebarTab", () => {
  const chatMessage = document.querySelector("#chat-message");

  const rollInterface = document.querySelector(
    "#roll-interface-wrapper",
  ) as HTMLElement;

  if (!chatMessage) {
    document.append(rollInterface);
    (rollInterface as HTMLElement).hidden = true;
  } else {
    chatMessage.after(rollInterface);
    rollInterface.hidden = false;
  }
});

Hooks.on("collapseSidebar", collapseSidebar);
Hooks.on("renderChatMessageHTML", renderChatMessage);
Hooks.on("renderCombatTracker", renderCombatTracker);
