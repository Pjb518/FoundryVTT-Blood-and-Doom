import performActionRoll from "../../rolls/performActionRoll.ts";

export default function getActionDiceSectionContents() {
  // Create section for the action dice buttons
  const actionDiceButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(diceQuantity => {
    const button = document.createElement("button");
    button.type = "button";
    button.ariaLabel = "Select Action Dice Quantity";
    button.dataset.diceQuantity = diceQuantity.toString();
    button.classList.add("bnd-roll-button", "bnd-roll-button--die");
    button.innerHTML = `<span class="bnd-roll-button__value">${diceQuantity.toString()}</span>`;

    button.addEventListener("click", (event) => {
      const target = event.currentTarget as HTMLButtonElement | null;

      if (!target) return;

      const diceQuantity = target.dataset.diceQuantity ?? "1";
      const activeDifficultyButton = document.querySelector(".bnd-roll-button--active") as HTMLButtonElement | null;
      const actionDifficulty = activeDifficultyButton?.dataset.difficultyLevel ?? "NONE";

      performActionRoll(parseInt(diceQuantity, 10), actionDifficulty);
    });

    return button;
  })

  const actionDiceRowHeader = document.createElement("header");
  actionDiceRowHeader.classList.add("bnd-roll-section__header");

  const actionDiceRowHeading = document.createElement("h4");
  actionDiceRowHeading.classList.add("bnd-heading", "bnd-heading--small")
  actionDiceRowHeading.innerText = "Action Dice Quantity";
  actionDiceRowHeader.append(actionDiceRowHeading);

  return [actionDiceRowHeader, ...actionDiceButtons];
}
