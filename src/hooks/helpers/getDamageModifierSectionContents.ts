export default function getDamageModifierSectionContents() {
  const damageModifierWrapper = document.createElement("div");
  damageModifierWrapper.classList.add("bnd-roll-section", `bnd-roll-section--damage-modifier`);

  const damageModifierInput = document.createElement("input") as HTMLInputElement;
  damageModifierInput.classList.add("bnd-roll-interface-die-input", "bnd-roll-interface-die-input--modifier");
  damageModifierInput.type = "number";
  damageModifierInput.placeholder = "0";

  const damageModifierCheckboxWrapper = document.createElement("label");
  damageModifierCheckboxWrapper.classList.add("bnd-roll-interface-checkbox-wrapper")
  damageModifierCheckboxWrapper.innerText = "Include Damage Modifier"

  const damageModifierCheckbox = document.createElement("input") as HTMLInputElement;
  damageModifierCheckbox.classList.add("bnd-roll-interface-checkbox");
  damageModifierCheckbox.type = "checkbox";
  damageModifierCheckbox.checked = true;

  damageModifierCheckboxWrapper.prepend(damageModifierCheckbox);

  const damageModifierHeader = document.createElement("header");
  damageModifierHeader.classList.add("bnd-roll-section__header", "bnd-roll-section__header--damage-modifier");

  const damageModifierHeading = document.createElement("h4");
  damageModifierHeading.classList.add("bnd-heading", "bnd-heading--small")
  damageModifierHeading.innerText = "Damage Modifier";
  damageModifierHeader.append(damageModifierHeading);

  damageModifierWrapper.append(damageModifierHeader, damageModifierInput, damageModifierCheckboxWrapper);

  return damageModifierWrapper;
}
