import performDoomRoll from "../../rolls/performDoomRoll.ts";

export default function getDoomRollButtons() {
  const doomButtonWrapper = document.createElement("section");
  doomButtonWrapper.classList.add("bnd-roll-button-wrapper");
  doomButtonWrapper.dataset.bndWrapperContent = "doom";

  const doomDiceRow = document.createElement("div");
  doomDiceRow.classList.add("bnd-roll-section", `bnd-roll-section--doom-dice`);

  const doomDiceButtons = [1, 2, 3, 4, 5, 6].map(diceQuantity => {
    const button = document.createElement("button");
    button.type = "button";
    button.ariaLabel = "Select Doom Dice Quantity";
    button.dataset.diceQuantity = diceQuantity.toString();
    button.classList.add("bnd-roll-button", "bnd-roll-button--die");
    button.innerHTML = `<span class="bnd-roll-button__value">${diceQuantity.toString()}</span>`;

    button.addEventListener("click", (event) => {
      const target = event.currentTarget as HTMLButtonElement | null;

      if (!target) return;

      const diceQuantity = target.dataset.diceQuantity ?? "1";

      performDoomRoll(parseInt(diceQuantity, 10));
    });

    return button;
  });

  const doomDiceRowHeader = document.createElement("header");
  doomDiceRowHeader.classList.add("bnd-roll-section__header");

  const doomDiceRowHeading = document.createElement("h4");
  doomDiceRowHeading.classList.add("bnd-heading", "bnd-heading--small")
  doomDiceRowHeading.innerText = "Doom Points Left";
  doomDiceRowHeader.append(doomDiceRowHeading);

  doomDiceRow.append(doomDiceRowHeader, ...doomDiceButtons);
  doomButtonWrapper.append(doomDiceRow);

  return doomButtonWrapper;
}
