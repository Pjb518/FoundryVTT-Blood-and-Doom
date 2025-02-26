import { createActionDieButton } from './createActionDieButton.ts';

export default function getActionDiceSectionContents() {
	const actionDiceButtons: HTMLButtonElement[] = [];

	for (let i = 1; i <= 18; i++) {
		actionDiceButtons.push(createActionDieButton(i));
	}

	const actionDiceExpandButton = document.createElement('button');
	actionDiceExpandButton.classList.add('bnd-action-dice-expand-button');
	actionDiceExpandButton.dataset.expanded = 'false';
	actionDiceExpandButton.dataset.tooltip = 'Toggle additional action dice';
	actionDiceExpandButton.dataset.tooltipDirection = 'UP';
	actionDiceExpandButton.innerHTML = `<i class="fa-solid fa-caret-right"></i>`;
	actionDiceExpandButton.addEventListener('click', function () {
		this.dataset.expanded = this.dataset.expanded === 'true' ? 'false' : 'true';
	});

	const actionDiceRowHeading = document.createElement('h4');
	actionDiceRowHeading.classList.add('bnd-heading', 'bnd-heading--small');
	actionDiceRowHeading.innerText = 'Action Dice Quantity';

	const actionDiceRowHeader = document.createElement('header');
	actionDiceRowHeader.classList.add('bnd-roll-section__header');
	actionDiceRowHeader.append(actionDiceRowHeading, actionDiceExpandButton);

	return [actionDiceRowHeader, ...actionDiceButtons];
}
