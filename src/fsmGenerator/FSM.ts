import { State } from "./State";

export class FSM {
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

  getCurrentState() {
    return this.currentState;
  }

  private setCurrentState(state: State) {
    return this.currentState = state;
  }

  handleInput(input: string) {
    const inputArray = Array.from(input);
    try {
      inputArray.forEach((inputChar) => {
        this.setCurrentState(this.currentState.process(inputChar));
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

