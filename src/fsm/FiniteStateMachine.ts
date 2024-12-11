import { State } from "./State";

export class FiniteStateMachine {
  private states: Record<string, State>;
  private initialState: State;
  private currentState: State;

  constructor(initialState: State) {
    this.states = { [initialState.value]: initialState };
    this.initialState = initialState;
    this.currentState = initialState;
  }

  addState(state: State) {
    this.states[state.value] = state;
  }

  removeStateByValue(stateValue: string) {
    delete this.states[stateValue];
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

