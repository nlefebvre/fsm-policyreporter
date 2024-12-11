import { FiniteStateMachine } from "../../../src/fsm/FiniteStateMachine"
import { State } from "../../../src/fsm/State";
import { FSMGenerator } from "../../../src/fsmGenerator/FSMGenerator";
import { mockAlphabet, mockFinalState, mockInitialState, mockStateArray, mockTransitions } from "../../data/mockData";

describe("Finite State Machine Tests", () => {
  let initialSate: State;

  beforeEach(() => {
    initialSate = new State("initial", false, {});
  })


  test("constructor returns object", () => {
    expect(new FiniteStateMachine(initialSate)).toBeDefined();
  });

  test("getState returns state in if exists", () => {
    const fsm = new FiniteStateMachine(initialSate);

    const state = fsm.getStateByValue(initialSate.value);

    expect(state).toBeDefined();
    expect(state).toHaveProperty("value", initialSate.value);
    expect(state).toHaveProperty("finalState");
  });

  test("getState returns undefined if does not exist", () => {
    const fsm = new FiniteStateMachine(initialSate);

    const state = fsm.getStateByValue("nonexistant state");

    expect(state).not.toBeDefined();
  });

  describe("handleInput tests", () => {
    let fsm: FiniteStateMachine;

    beforeEach(() => {
      fsm = new FSMGenerator()
        .addStates(mockStateArray)
        .addAlphabet(mockAlphabet)
        .addFinalStates(mockFinalState)
        .setInitialState(mockInitialState)
        .addTransitions(mockTransitions)
        .build();
    });

    test("handleInput provides response for valid input", () => {

      const state = fsm.handleInput("12345678990abcef");

      expect(state).toBeDefined();
      expect(state).toHaveProperty("value", 'S8');
    });

    test("handleInput logs error for invalid input", () => {
      const errorSpy = jest.spyOn(console, 'error')

      fsm.handleInput("1234567899--T--0abcef");

      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    test("reset sets back to initial srtate", () => {
      const initialState = fsm.getCurrentState();
      fsm.handleInput("1234567");


      expect(fsm.getCurrentState()).not.toBe(initialState);
      fsm.reset();
      expect(fsm.getCurrentState()).toBe(initialState);
    });

    test("handleInput can be split", () => {
      const path1 = fsm.handleInput("1234567");

      fsm.reset();

      fsm.handleInput("1");
      fsm.handleInput("2");
      fsm.handleInput("3");
      fsm.handleInput("4");
      fsm.handleInput("5");
      fsm.handleInput("6");
      fsm.handleInput("7");

      expect(fsm.getCurrentState()).toBe(path1);
    });
  });
});
