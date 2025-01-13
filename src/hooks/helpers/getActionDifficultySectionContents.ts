export default function getActionDifficultySectionContents() {
  const difficultyRowHeader = document.createElement("header");
  difficultyRowHeader.classList.add("bnd-roll-section__header");

  const difficultyRowHeading = document.createElement("h4");
  difficultyRowHeading.classList.add("bnd-heading", "bnd-heading--small")
  difficultyRowHeading.innerText = "Action Difficulty";
  difficultyRowHeader.append(difficultyRowHeading);

  const difficultyButtons: HTMLButtonElement[] = [];

  CONFIG.BLOOD_AND_DOOM.DIFFICULTY_LEVELS.forEach((requiredSuccesses, difficultyLevel) => {
    const button = document.createElement("button");
    button.type = "button";
    button.ariaLabel = "Select Action Difficulty";
    button.dataset.difficultyLevel = difficultyLevel;
    button.classList.add("bnd-roll-button", "bnd-roll-button--difficulty");

    if (difficultyLevel === "NONE") {
      button.classList.add("bnd-roll-button--active");
    }

    button.innerHTML = `
      <span class="bnd-roll-button__value">
        ${requiredSuccesses?.toString() ?? "?"}
      </span>
    `;

    button.addEventListener("click", (event) => {
      const target = event.currentTarget as HTMLButtonElement | null;

      if (!target) return;

      const difficultyButtons = document.querySelectorAll(".bnd-roll-button--difficulty");

      difficultyButtons.forEach(button => {
        button.classList.remove("bnd-roll-button--active");
      });

      target.classList.add("bnd-roll-button--active")
    });

    difficultyButtons.push(button);
  });

  return [difficultyRowHeader, ...difficultyButtons];

}
