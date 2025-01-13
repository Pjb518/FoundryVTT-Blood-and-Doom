import './scss/main.scss';

import init from './hooks/init.ts';
import i18nInit from './hooks/i18nInit.ts';
import renderChatLog from './hooks/renderChatLog.ts';
import renderChatMessage from './hooks/renderChatMessage.ts';
import renderSettings from './hooks/renderSettings.ts';
import renderCombatTracker from './hooks/renderCombatTracker.ts';

Hooks.once('init', init);
Hooks.once('i18nInit', i18nInit);

Hooks.on('renderChatLog', renderChatLog)
Hooks.on('renderChatMessage', renderChatMessage)
Hooks.on('renderSettings', renderSettings);
Hooks.on('renderCombatTracker', renderCombatTracker);
