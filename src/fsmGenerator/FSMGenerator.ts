import { FiniteStateMachine } from "../fsm/FiniteStateMachine";
import { validateAll } from "../validation/InputValidators";
import { State } from "../fsm/State";
import { generateErrorMessage } from "../validation/Errors";

export class FSMGenerator {
  states: Array<string>;
  initialState: string;
  finalStates: Array<string>;
  alphabet: Array<string>;
  transitions: Array<[string, string, string]>

  constructor() {
    this.states = [];
    this.initialState = '';
    this.finalStates = [];
    this.alphabet = [];
    this.transitions = [];
    return this;
  }

  addStates(states: Array<string>) {
    this.states.push(...states);
    return this;
  }

  setInitialState(initState: string) {
    this.initialState = initState;
    return this;
  }

  addFinalStates(finalStates: Array<string>) {
    this.finalStates.push(...finalStates);
    return this;
  }

  addAlphabet(alphabet: Array<string>) {
    this.alphabet.push(...alphabet);
    return this;
  }

  addTransitions(transitions: Array<[string, string, string]>) {
    this.transitions.push(...transitions);
    return this;
  }

  build() {
    const errors = validateAll({
      states: this.states,
      initialState: this.initialState,
      finalStates: this.finalStates,
      alphabet: this.alphabet,
      transitions: this.transitions
    });
    if (errors.length > 0) {
      throw new Error(generateErrorMessage("Error building Finite State Machine", errors));
    }

    const states = this.states.map((value) => {
      return new State(value, false, {});
    });
    const initialState: State = states.find((state) => this.initialState === state.value)!;
    const finiteStateMachine = new FiniteStateMachine(initialState);

    states.forEach((state) => {
      finiteStateMachine.addState(state);
    })

    this.finalStates.forEach((finalState) => {
      finiteStateMachine.getStateByValue(finalState).setFinal(true);
    });

    this.transitions.forEach(([startingStateValue, alphabet, endingStateValue]) => {
      const startingState = finiteStateMachine.getStateByValue(startingStateValue);
      const endingState = finiteStateMachine.getStateByValue(endingStateValue);
      startingState.addTransition(alphabet, endingState);
    });

    return finiteStateMachine;
  }
}