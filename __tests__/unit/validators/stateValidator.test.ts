import { stateErrors, validateStates } from "../../../src/validation/InputValidators";

describe("State Validation Tests", () => {

  test("returns empty array for valid state", () => {
    expect(validateStates(["S0", "S1", "S2"])).toEqual([]);
  });

  test("returns error for empty state list", () => {
    expect(validateStates([])).toContainEqual(expect.objectContaining({
      message: stateErrors.noEntries
    }));
  });

  test("returns error for state list with duplicates", () => {
    expect(validateStates(["S0", "S1", "S2", "S3", "S1"])).toContainEqual(expect.objectContaining({
      message: stateErrors.duplicateEntries
    }));
  });
});