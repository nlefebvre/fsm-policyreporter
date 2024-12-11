import { FSM } from "../../../src/fsmGenerator/FSM"
import { mockFinalState, mockInitialState, mockStateArray, mockTransitions } from "../../data/mockData";

describe("FSM Tests", () => {

  test("FSMGenerator returns object", () => {
    expect(new FSM(mockStateArray, mockInitialState, mockFinalState, mockTransitions)).toBeDefined()
  })

  test("getState returns state in if exists", () => {
    const fsm = new FSM(mockStateArray, mockInitialState, mockFinalState, mockTransitions);

    const state = fsm.getStateByValue(mockInitialState);

    expect(state).toBeDefined();
    expect(state).toHaveProperty("value", mockInitialState);
    expect(state).toHaveProperty("finalState");
  });

  test("getState returns undefined if does not exist", () => {
    const fsm = new FSM(mockStateArray, mockInitialState, mockFinalState, mockTransitions);

    const state = fsm.getStateByValue("nonexistant state");

    expect(state).not.toBeDefined();
  });

  describe("handleInput tests", () => {
    let fsm: FSM;

    beforeEach(() => {
      fsm = new FSM(mockStateArray, mockInitialState, mockFinalState, mockTransitions);
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
