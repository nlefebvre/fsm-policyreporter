import { FSMGenerator } from "../../../src/fsmGenerator/FSMGenerator"
import { mockAlphabet, mockFinalState, mockInitialState, mockStateArray, mockTransitions } from "../../data/mockData";

describe("FSMGenerator Tests", () => {

  test("FSMGenerator returns object", () => {
    expect(new FSMGenerator()).toBeDefined();
  });

  test("AddStates updates state", () => {
    const generator = new FSMGenerator();
    expect(generator.states).toStrictEqual([]);

    generator.addStates(mockStateArray);
    expect(generator.states).toStrictEqual(mockStateArray);
  });

  test("AddStates adds to existing state array", () => {
    const generator = new FSMGenerator()
      .addStates(mockStateArray)
      .addStates(mockStateArray);

    expect(generator.states).toStrictEqual([...mockStateArray, ...mockStateArray]);
  });

  test("addAlphabet updates alphabet", () => {
    const generator = new FSMGenerator();
    expect(generator.alphabet).toStrictEqual([]);

    generator.addAlphabet(mockAlphabet);
    expect(generator.alphabet).toStrictEqual(mockAlphabet);
  });

  test("addAlphabet adds to existing alphabet array", () => {
    const generator = new FSMGenerator()
      .addAlphabet(mockAlphabet)
      .addAlphabet(mockAlphabet);

    expect(generator.alphabet).toStrictEqual([...mockAlphabet, ...mockAlphabet]);
  });

  test("addFinalStates updates finalStates", () => {
    const generator = new FSMGenerator();
    expect(generator.finalStates).toStrictEqual([]);

    generator.addFinalStates(mockFinalState);
    expect(generator.finalStates).toStrictEqual(mockFinalState);
  });

  test("addFinalStates adds to existing finalStates array", () => {
    const generator = new FSMGenerator()
      .addFinalStates(mockFinalState)
      .addFinalStates(mockFinalState);

    expect(generator.finalStates).toStrictEqual([...mockFinalState, ...mockFinalState]);
  });


  test("setInitialState updates initialState", () => {
    const generator = new FSMGenerator();
    expect(generator.initialState).toBe('');

    generator.setInitialState(mockInitialState);
    expect(generator.initialState).toBe(mockInitialState);
  });

  test("addFinalStates adds to existing finalStates array", () => {
    const generator = new FSMGenerator()
      .addFinalStates(mockFinalState)
      .addFinalStates(mockFinalState);

    expect(generator.finalStates).toStrictEqual([...mockFinalState, ...mockFinalState]);
  });

  describe("build tests", () => {
    test("build returns object", () => {
      expect(new FSMGenerator()
        .addStates(mockStateArray)
        .addAlphabet(mockAlphabet)
        .addFinalStates(mockFinalState)
        .setInitialState(mockInitialState)
        .addTransitions(mockTransitions)
        .build()).toBeDefined();
    });

    test("build throws error if nothing is defined", () => {
      expect(() => new FSMGenerator().build()).toThrowErrorMatchingSnapshot();
    });

    test("build throws error for duplicate states", () => {
      const generator = new FSMGenerator()
        .addStates(mockStateArray)
        .addStates(mockStateArray)
        .addAlphabet(mockAlphabet)
        .addFinalStates(mockFinalState)
        .setInitialState(mockInitialState)
        .addTransitions(mockTransitions);

      expect(() => generator.build()).toThrowErrorMatchingSnapshot();
    });
  });
});

