import getActionDiceSectionContents from "./getActionDiceSectionContents.ts";
import getActionDifficultySectionContents from "./getActionDifficultySectionContents.ts";

export default function getActionRollButtons() {
  const actionButtonWrapper = document.createElement("section");
  actionButtonWrapper.classList.add("bnd-roll-button-wrapper", "bnd-roll-button-wrapper--active");
  actionButtonWrapper.dataset.bndWrapperContent = "action";

  const [difficultyRow, actionDiceRow] = ["difficulty", "dice"].map(actionSection => {
    const section = document.createElement("div");
    section.classList.add("bnd-roll-section", `bnd-roll-section--${actionSection}`);

    return section;
  });

  const difficultyRowContents = getActionDifficultySectionContents()
  const actionDiceRowContents = getActionDiceSectionContents()

  difficultyRow.append(...difficultyRowContents);
  actionDiceRow.append(...actionDiceRowContents);
  actionButtonWrapper.append(difficultyRow, actionDiceRow);

  return actionButtonWrapper;
}
