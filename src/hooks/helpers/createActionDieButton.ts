import performActionRoll from '../../rolls/performActionRoll.ts';

export function createActionDieButton(diceQuantity: number): HTMLButtonElement {
	const button = document.createElement('button');
	button.type = 'button';
	button.ariaLabel = 'Select Action Dice Quantity';
	button.dataset.diceQuantity = diceQuantity.toString();
	button.classList.add('bnd-roll-button', 'bnd-roll-button--die');
	button.innerHTML = `<span class="bnd-roll-button__value">${diceQuantity.toString()}</span>`;

	button.addEventListener('click', (event) => {
		const target = event.currentTarget as HTMLButtonElement | null;

		if (!target) return;

		const diceQuantity = target.dataset.diceQuantity ?? '1';

		const activeDifficultyButton = document.querySelector(
			'.bnd-roll-button--active',
		) as HTMLButtonElement | null;

		const actionDifficulty = activeDifficultyButton?.dataset.difficultyLevel ?? 'NONE';

		performActionRoll(Number.parseInt(diceQuantity, 10), actionDifficulty);
	});

	return button;
}
