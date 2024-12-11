import { State } from "../../../src/fsm/State";

describe("Tests for State class", () => {

  test("constructor creates new state", () => {
    const value = "state value"
    const state = new State(value, false, {});

    expect(state).toBeDefined();
    expect(state).toHaveProperty("value", "state value");
  });

  test("isFinal returns `final` value", () => {

    expect(new State("falsefinal", false, {}).isFinal()).toBe(false);
    expect(new State("truefinal", true, {}).isFinal()).toBe(true);
  });

  test("setFinal updates `final` value", () => {
    const state = new State("falsefinal", false, {});

    expect(state.isFinal()).toBe(false)
    state.setFinal(true);
    expect(state.isFinal()).toBe(true)
  });

  describe("transitions", () => {
    test("add transition provide new transition", () => {
      const state1 = new State("one", false, {});
      const state2 = new State("two", false, {});

      state1.addTransition("up", state2);

      expect(state1.transition).toHaveProperty("up", state2);
    });

    test("removeTransition removes transition", () => {
      const state1 = new State("one", false, {});

      state1.addTransition("up", state1);
      expect(state1.transition).not.toHaveProperty("up", null);
      state1.removeTransition("up");
      expect(state1.transition).toHaveProperty("up", null);
    });

    test("process returns new state if transition exists", () => {
      const state1 = new State("one", false, {});
      const state2 = new State("two", false, { "down": state1 });

      expect(state2.process("down")).toBe(state1);
    });

    test("process throws error transition does not exist", () => {
      const state1 = new State("one", false, {});
      const state2 = new State("two", false, { "down": state1 });

      expect(() => state2.process("up")).toThrowErrorMatchingSnapshot();
    });
  })
});