
export class FSMGenerator {
  private states: Record<string, State>;
  private initialState: State;
  private currentState: State;

  constructor(
    states: Array<string>,
    initialState: string,
    finalStates: Array<string>,
    transitions: Array<[string, string, string]>) {
    this.states = states.reduce((states, stateValue: string) => {
      return { ...states, [stateValue]: new State(stateValue, false, {}) };
    }, {})
    this.initialState = this.states[initialState];
    this.currentState = this.initialState;

    finalStates.forEach((finalState) => {
      this.states[finalState].setFinal(true);
    });

    transitions.forEach(([initState, alpha, final]) => {
      this.states[initState].addTransition(alpha, this.states[final])
    })
  }

  getStateByValue(value: string) {
    return this.states[value];
  }

  handleInput(input: string) {
    const inputArray = Array.from(input);
    try {
      inputArray.forEach((inputChar) => {
        this.currentState = this.currentState.process(inputChar);
      });
    } catch (error) {
      console.error('error processing input', input);
    }

    return this.currentState;
  }

  reset() {
    this.currentState = this.initialState;
  }
}

class State {
  value: string;
  finalState: boolean;
  transition: Record<string, State | null>;

  constructor(value: string, finalState: boolean, transition: Record<string, State>) {
    this.value = value;
    this.finalState = finalState;
    this.transition = transition;
  }

  addTransition(alpha: string, state: State) {
    if (this.transition[alpha]) {
      throw Error(`Transition already exists!`)
    } else {
      this.transition[alpha] = state;
    }
  }

  removeTransition(alpha: string) {
    this.transition[alpha] = null;
  }

  setFinal(isFinal: boolean): void {
    this.finalState = isFinal;
  }

  isFinal() {
    return this.finalState;
  }

  process(alpha: string) {
    if (this.transition[alpha]) {
      return this.transition[alpha]
    }
    throw Error(`Missing transition for value ${alpha} on state '${this.value}`)
  }
}