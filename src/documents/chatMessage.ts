import type DiceTerm from '@league-of-foundry-developers/foundry-vtt-types/src/foundry/client-esm/dice/terms/dice.d.mts';

export type SystemChatMessageTypes = Exclude<foundry.documents.BaseChatMessage.TypeNames, 'base'>;

interface BloodAndDoomChatMessage<
	ChatMessageType extends SystemChatMessageTypes = SystemChatMessageTypes,
> {
	type: ChatMessageType;
	system: DataModelConfig['ChatMessage'][ChatMessageType];
}

class BloodAndDoomChatMessage extends ChatMessage {
	/** ------------------------------------------------------ */
	/**                    Type Helpers                        */
	/** ------------------------------------------------------ */
	isType<TypeName extends SystemChatMessageTypes>(
		type: TypeName,
	): this is BloodAndDoomChatMessage<TypeName> {
		return type === (this.type as SystemChatMessageTypes);
	}

	async reroll(): Promise<void> {
		if (this.type !== 'action') {
			ui.notifications!.error('Invalid message type. You may only reroll action rolls.');
			return;
		}

		if (this.system.setback) {
			ui.notifications!.error('Cannot reroll a roll with a setback.');
			return;
		}

		if (this.system.rerolled) {
			ui.notifications!.error('Cannot reroll a roll that has already been rerolled.');
			return;
		}

		const dice = this.rolls[0]?.dice ?? [];
		const successfulDiceResults: DiceTerm.Result[] = [];

		for (const dieSet of dice) {
			for (const result of dieSet.results) {
				if (result.result >= 8) successfulDiceResults.push(result);
			}
		}

		const newRoll = new Roll(`${this.system.diceQuantity - successfulDiceResults.length}d10`);
		await newRoll.evaluate();

		const results = [...newRoll.dice[0].results, ...successfulDiceResults];

		const reroll = Roll.fromTerms([
			new foundry.dice.terms.Die({ number: this.system.diceQuantity, faces: 10, results }),
		]);

		const rerollSuccesses = results.reduce((acc, { result }) => {
			if (result === 10) return acc + 2;
			if (result >= 8) return acc + 1;

			return acc;
		}, 0);

		game.dice3d.showForRoll(
			newRoll,
			game.user,
			true,
			this.whisper,
			this.blind,
			null,
			this.speaker,
			{
				ghost: false,
				secret: false,
			},
		);

		this.update({
			rolls: [reroll],
			'system.successes': rerollSuccesses,
			'system.rerolled': true,
		});
	}
}

export { BloodAndDoomChatMessage };
