import CombatTracker from "../view/ui/CombatTracker.svelte";
import { mount } from 'svelte';

export default function renderCombatTracker(_, [html]: HTMLElement[]) {
  const combatTracker = html.querySelector("#combat-tracker");
  combatTracker?.remove()

  const combatControls = html.querySelector("#combat-controls");

  mount(CombatTracker, {
    anchor: combatControls as HTMLElement,
    target: html as HTMLElement
  })
}
