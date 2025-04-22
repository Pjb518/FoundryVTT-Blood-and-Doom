export default function collapseSidebar() {
  const chatMessage = document.querySelector("#chat-message");

  const rollInterface = document.querySelector(
    "#roll-interface-wrapper",
  ) as HTMLElement;

  chatMessage!.after(rollInterface);
  rollInterface.hidden = false;
}
