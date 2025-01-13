export default function toggleRollInterfaceTab(event) {
  const target = event.currentTarget;

  if (!target) return;

  const newTab = target.dataset.bndTab;
  const rollWrapper = document.querySelector(`[data-bnd-wrapper-content="${newTab}"]`);

  if (!rollWrapper) return;

  const chatLogElement = document.querySelector("#chat-log") as HTMLOListElement | null;

  if (!chatLogElement) return;

  const initialChatLogHeight = chatLogElement.clientHeight;
  const initialChatLogScrollHeight = chatLogElement.scrollHeight;
  const initialChatLogScrollLevel = chatLogElement.scrollTop;

  const tabButtons = document.querySelectorAll("[data-bnd-tab]");

  tabButtons.forEach(button => {
    button.classList.remove("bnd-tab-button--active")
  })

  const rollWrappers = document.querySelectorAll("[data-bnd-wrapper-content");

  rollWrappers.forEach(button => {
    button.classList.remove("bnd-roll-button-wrapper--active")
  })

  target.classList.add("bnd-tab-button--active")
  rollWrapper.classList.add("bnd-roll-button-wrapper--active");

  if (initialChatLogHeight + initialChatLogScrollLevel !== initialChatLogScrollHeight) return;

  ui.chat.scrollBottom();
}
