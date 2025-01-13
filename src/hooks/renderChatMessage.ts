import { mount } from 'svelte';

import BloodAndDoomActionChatCard from "../view/chat/ActionChatCard.svelte";
import BloodAndDoomDamageChatCard from "../view/chat/DamageChatCard.svelte";
import BloodAndDoomDoomChatCard from "../view/chat/DoomChatCard.svelte";

export default function renderChatMessage(message, html) {
  let component;
  const [target] = $(html);

  if (!target) return;

  switch (message.type) {
    case 'action':
      component = BloodAndDoomActionChatCard;
      break;
    case 'damage':
      component = BloodAndDoomDamageChatCard;
      break;
    case 'doom':
      component = BloodAndDoomDoomChatCard;
      break;
    default:
      return;
  }

  target.classList.add('bnd-chat-card');
  $(html).find('.message-header')[0]?.remove();
  $(html).find('.message-content')[0]?.remove();

  message._svelteComponent = mount(component, {
    target,
    props: { messageDocument: message }
  });
}
