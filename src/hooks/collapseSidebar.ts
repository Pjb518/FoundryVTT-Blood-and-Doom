import { renderRollInterface } from "./helpers/renderRollIntercace.ts";

export default function collapseSidebar() {
  document.querySelector("#roll-interface-wrapper")?.remove();
  renderRollInterface();
}
