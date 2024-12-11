import { finalStateErrors, validateFinalStates } from "../../../src/validation/InputValidators";

describe("Final State Validation Tests", () => {

  test("returns empty array for valid final state", () => {
    expect(validateFinalStates(["S0", "S1"], ["S0"])).toEqual([]);
  });

  test("returns empty array for valid final states", () => {
    expect(validateFinalStates(["S0", "S1"], ["S1", "S0"])).toEqual([]);
  });

  test("returns error for missing no final state", () => {
    expect(validateFinalStates(["S0", "S1"], [])).toContainEqual(expect.objectContaining({
      message: finalStateErrors.noState
    }));
  });

  test("returns error for invalid final state", () => {
    expect(validateFinalStates(["S0", "S1"], ["S0", "S0", "S1", "S2"])).toContainEqual(expect.objectContaining({
      message: finalStateErrors.invalidState
    }));
  });

  test("returns multiple errors for multiple invalid states", () => {
    expect(validateFinalStates(["S0", "S1"], ["S0", "S1", "S2", "S3", "S4"])).toHaveLength(3);
  });
});