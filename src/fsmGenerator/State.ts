export class State {
  value: string;
  finalState: boolean;
  transition: Record<string, State | null>;

  constructor(value: string, finalState: boolean, transition: Record<string, State>) {
    this.value = value;
    this.finalState = finalState;
    this.transition = transition;
  }

  addTransition(alpha: string, state: State): void {
    if (this.transition[alpha]) {
      throw Error(`Transition already exists!`)
    } else {
      this.transition[alpha] = state;
    }
  }

  removeTransition(alpha: string): void {
    this.transition[alpha] = null;
  }

  setFinal(isFinal: boolean): void {
    this.finalState = isFinal;
  }

  isFinal(): boolean {
    return this.finalState;
  }

  process(alpha: string): State {
    if (this.transition[alpha]) {
      return this.transition[alpha]
    }
    throw Error(`Missing transition for value ${alpha} on state '${this.value}'`)
  }
}