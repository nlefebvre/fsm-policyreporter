import { initialStateErrors, validateInitialState } from "../../../src/fsmGenerator/InputValidators";

describe("Initial State Validation Tests", () => {

  test("returns empty array for valid initial state", () => {
    expect(validateInitialState(["S0", "S1"], "S0")).toEqual([]);
  });

  test("returns error for missing initialState", () => {
    expect(validateInitialState(["S0", "S1"], "")).toContainEqual(expect.objectContaining({
      message: initialStateErrors.noState
    }));
  });

  test("returns error for invalid initialState", () => {
    expect(validateInitialState(["S0", "S1"], "S2")).toContainEqual(expect.objectContaining({
      message: initialStateErrors.invalidState
    }));
  });
});