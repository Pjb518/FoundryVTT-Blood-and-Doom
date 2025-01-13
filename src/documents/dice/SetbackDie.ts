declare namespace SetbackDie {
  interface TermData extends foundry.dice.terms.Die.TermData {
  }
}

class SetbackDie extends foundry.dice.terms.Die {
  constructor(termData) {
    termData.faces = 10;
    termData.number = 1;
    super(termData);
  }

  get setbackOccurred() {
    if (!this._evaluated) return undefined;

    return [1, 2].includes(this.total as number);
  }
}

export { SetbackDie };
