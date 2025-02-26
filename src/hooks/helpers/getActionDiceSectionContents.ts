import { createActionDieButton } from './createActionDieButton.ts';

export default function getActionDiceSectionContents() {
	const actionDiceButtons: HTMLButtonElement[] = [];

	for (let i = 1; i <= 18; i++) {
		actionDiceButtons.push(createActionDieButton(i));
	}

	const actionDiceExpandButton = document.createElement('button');
	actionDiceExpandButton.classList.add('bnd-action-dice-expand-button');
	actionDiceExpandButton.dataset.expanded = 'false';
	actionDiceExpandButton.innerHTML = `Expand <i class="fa-solid fa-plus"></i>`;
	actionDiceExpandButton.addEventListener('click', function () {
		if (this.dataset.expanded === 'true') {
			this.dataset.expanded = 'false';
			this.innerHTML = `Expand <i class="fa-solid fa-plus"></i>`;
		} else {
			this.dataset.expanded = 'true';
			this.innerHTML = `Collapse <i class="fa-solid fa-minus"></i>`;
		}
	});

	const actionDiceRowHeading = document.createElement('h4');
	actionDiceRowHeading.classList.add('bnd-heading', 'bnd-heading--small');
	actionDiceRowHeading.innerText = 'Action Dice Quantity';

	const actionDiceRowHeader = document.createElement('header');
	actionDiceRowHeader.classList.add('bnd-roll-section__header');
	actionDiceRowHeader.append(actionDiceRowHeading, actionDiceExpandButton);

	return [actionDiceRowHeader, ...actionDiceButtons];
}
