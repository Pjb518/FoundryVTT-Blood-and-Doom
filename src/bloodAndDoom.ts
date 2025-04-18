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
Hooks.on("collapseSidebar", collapseSidebar);
Hooks.on("renderChatMessageHTML", renderChatMessage);
Hooks.on("renderCombatTracker", renderCombatTracker);
