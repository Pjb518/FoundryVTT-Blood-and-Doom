// Actors
import { BloodAndDoomBaseActor } from "../documents/actor/base.svelte.ts";
import { BloodAndDoomCharacter } from "../documents/actor/character.ts";
import { BloodAndDoomNPC } from "../documents/actor/npc.ts";

// Chat Messages
import { BloodAndDoomChatMessage } from "../documents/chatMessage.ts";

// Combat
import { BloodAndDoomCombat } from '../documents/combat/combat.svelte.ts';
import { BloodAndDoomCombatant } from '../documents/combat/combatant.svelte.ts';

// Items
import { BloodAndDoomBaseItem } from "../documents/item/base.svelte.ts";

// Tokens
import { BloodAndDoomTokenDocument } from '../documents/token/tokenDocument.ts';

export default function registerDocumentConfig() {
  return {
    Actor: {
      documentClasses: {
        base: BloodAndDoomBaseActor,
        character: BloodAndDoomCharacter,
        npc: BloodAndDoomNPC
      }
    },
    ChatMessage: {
      documentClass: BloodAndDoomChatMessage,
    },
    Combat: {
      documentClass: BloodAndDoomCombat
    },
    Combatant: {
      documentClasses: {
        base: BloodAndDoomCombatant,
        character: BloodAndDoomCombatant,
        npc: BloodAndDoomCombatant
      }
    },
    Item: {
      documentClasses: {
        base: BloodAndDoomBaseItem
      }
    },
    Token: {
      documentClass: BloodAndDoomTokenDocument
    }
  };
}
