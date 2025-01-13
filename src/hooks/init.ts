import { BLOOD_AND_DOOM } from '../config.js';
import { BLOOD_AND_DOOM_GAME } from '../game.ts';

// Document proxies
import ActorProxy from '../documents/actor/actorProxy.ts';
import ItemProxy from '../documents/item/itemProxy.ts';

// Chat
import { BloodAndDoomChatMessage } from '../documents/chatMessage.ts';

// Combat
import { BloodAndDoomCombat } from '../documents/combat/combat.svelte.ts';
import { BloodAndDoomCombatant } from '../documents/combat/combatant.svelte.ts';

// Data models
import actorDataModels from '../models/actor/actorDataModels.ts';
import chatDataModels from '../models/chat/chatDataModels.ts';
import combatantDataModels from '../models/combatant/combatantDataModels.ts';
import itemDataModels from '../models/item/itemDataModels.ts';

// Dice
import { SetbackDie } from '../documents/dice/SetbackDie.ts';

// Tokens
import { BloodAndDoomTokenDocument } from '../documents/token/tokenDocument.ts';

// Sheets
import NPCSheet from '../documents/sheets/NPCSheet.svelte.ts';
import PlayerCharacterSheet from '../documents/sheets/PlayerCharacterSheet.svelte.ts';
import AmmunitionSheet from '../documents/sheets/AmmunitionSheet.svelte.ts';
import EquipmentSheet from '../documents/sheets/EquipmentSheet.svelte.ts';
import MiscellaneousObjectSheet from '../documents/sheets/MiscellaneousObjectSheet.svelte copy.ts';
import MonsterFeatureSheet from '../documents/sheets/MonsterFeatureSheet.svelte.ts';
import WeaponSheet from '../documents/sheets/WeaponSheet.svelte.ts';

export default function init() {
  CONFIG.BLOOD_AND_DOOM = BLOOD_AND_DOOM;

  CONFIG.Actor.documentClass = ActorProxy;
  CONFIG.ChatMessage.documentClass = BloodAndDoomChatMessage;
  CONFIG.Combat.documentClass = BloodAndDoomCombat;
  CONFIG.Combatant.documentClass = BloodAndDoomCombatant;
  CONFIG.Item.documentClass = ItemProxy;
  CONFIG.Token.documentClass = BloodAndDoomTokenDocument;

  // Add data models
  CONFIG.Actor.dataModels = actorDataModels;
  CONFIG.ChatMessage.dataModels = chatDataModels;
  CONFIG.Combatant.dataModels = combatantDataModels;
  CONFIG.Item.dataModels = itemDataModels;

  // Add Dice
  CONFIG.Dice.SetbackDie = SetbackDie;
  CONFIG.Dice.rolls.push(SetbackDie);

  game.bloodAndDoom = BLOOD_AND_DOOM_GAME;

  // Set tooltips to animate faster
  TooltipManager.TOOLTIP_ACTIVATION_MS = 100;

  // Sheet registration
  Actors.unregisterSheet('core', ActorSheet);

  Actors.registerSheet('bloodAndDoom', NPCSheet, {
    types: ['npc'],
    makeDefault: true,
    label: 'BLOOD_AND_DOOM.sheets.npc'
  });

  Actors.registerSheet('bloodAndDoom', PlayerCharacterSheet, {
    types: ['character'],
    makeDefault: true,
    label: 'BLOOD_AND_DOOM.sheets.character'
  });

  Items.unregisterSheet('core', ItemSheet);

  Items.registerSheet('bloodAndDoom', AmmunitionSheet, {
    types: ['ammunition'],
    makeDefault: true,
    label: 'BLOOD_AND_DOOM.sheets.ammunition'
  });

  Items.registerSheet('bloodAndDoom', EquipmentSheet, {
    types: ['equipment'],
    makeDefault: true,
    label: 'BLOOD_AND_DOOM.sheets.equipment'
  });

  Items.registerSheet('bloodAndDoom', MiscellaneousObjectSheet, {
    types: ['miscellaneous'],
    makeDefault: true,
    label: 'BLOOD_AND_DOOM.sheets.miscellaneous'
  });

  Items.registerSheet('bloodAndDoom', MonsterFeatureSheet, {
    types: ['monsterFeature'],
    makeDefault: true,
    label: 'BLOOD_AND_DOOM.sheets.monsterFeature'
  });

  Items.registerSheet('bloodAndDoom', WeaponSheet, {
    types: ['weapon'],
    makeDefault: true,
    label: 'BLOOD_AND_DOOM.sheets.weapon'
  });
}
