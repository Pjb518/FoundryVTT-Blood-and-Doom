import performDamageRoll from "../../rolls/performDamageRoll.ts";

export default function getDamageDiceSectionContents() {
  const damageDiceRow = document.createElement("div");
  damageDiceRow.classList.add("bnd-roll-section", `bnd-roll-section--damage-dice`);

  const damageDiceButtons = ["4", "6", "8", "10", "12"].map(dieSize => {
    const button = document.createElement("button");
    button.type = "button";
    button.ariaLabel = "Select Damage Die Size";
    button.dataset.dieSize = dieSize;
    button.classList.add("bnd-roll-button", "bnd-roll-button--die", `bnd-roll-button--d${dieSize}`);
    button.innerHTML = `<span class="bnd-roll-button__value">d${dieSize}</span>`;

    button.addEventListener("click", (event) => {
      const target = event.currentTarget as HTMLButtonElement | null;

      if (!target) return;

      const dieSize = target.dataset.dieSize!;

      performDamageRoll(dieSize);
    });

    return button;
  });

  const damageDiceRowHeader = document.createElement("header");
  damageDiceRowHeader.classList.add("bnd-roll-section__header");

  const damageDiceRowHeading = document.createElement("h4");
  damageDiceRowHeading.classList.add("bnd-heading", "bnd-heading--small")
  damageDiceRowHeading.innerText = "Damage Die Size";
  damageDiceRowHeader.append(damageDiceRowHeading);

  damageDiceRow.append(damageDiceRowHeader, ...damageDiceButtons);

  return damageDiceRow;
}
