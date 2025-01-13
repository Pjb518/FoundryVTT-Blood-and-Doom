import getDamageDieQuantitySectionContents from "./getDamageDieQuantitySectionContents.ts";
import getDamageModifierSectionContents from "./getDamageModifierSectionContents.ts";
import getDamageDiceSectionContents from "./getDamageDiceSectionContents.ts";

export default function getDamageRollButtons() {
  const damageButtonWrapper = document.createElement("section");
  damageButtonWrapper.classList.add("bnd-roll-button-wrapper", "bnd-roll-button-wrapper--damage");
  damageButtonWrapper.dataset.bndWrapperContent = "damage";

  const damageDieQuantityWrapper = getDamageDieQuantitySectionContents();
  const damageModifierWrapper = getDamageModifierSectionContents();
  const damageDiceRow = getDamageDiceSectionContents();

  damageButtonWrapper.append(damageDieQuantityWrapper, damageModifierWrapper, damageDiceRow);

  return damageButtonWrapper;
}
