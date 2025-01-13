export default function getDamageDieQuantitySectionContents() {
  const damageDieQuantityWrapper = document.createElement("div");
  damageDieQuantityWrapper.classList.add("bnd-roll-section", `bnd-roll-section--damage-die-quantity`);

  const damageDieQuantityInput = document.createElement("input") as HTMLInputElement;
  damageDieQuantityInput.classList.add("bnd-roll-interface-die-input", "bnd-roll-interface-die-input--dice-quantity");
  damageDieQuantityInput.type = "number";
  damageDieQuantityInput.placeholder = "1";
  damageDieQuantityInput.min = "1";

  const damageDieQuantityHeader = document.createElement("header");
  damageDieQuantityHeader.classList.add("bnd-roll-section__header", "bnd-roll-section__header--damage-die-quantity");

  const damageDieQuantityHeading = document.createElement("h4");
  damageDieQuantityHeading.classList.add("bnd-heading", "bnd-heading--centered", "bnd-heading--small")
  damageDieQuantityHeading.innerText = "#";
  damageDieQuantityHeader.append(damageDieQuantityHeading);

  damageDieQuantityWrapper.append(damageDieQuantityHeader, damageDieQuantityInput);

  return damageDieQuantityWrapper;
}
