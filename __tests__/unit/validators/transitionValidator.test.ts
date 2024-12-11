import { transitionFnErrors, validateTransitions } from "../../../src/validation/InputValidators";

describe("Transition Validation Tests", () => {
  const validStates = ["S0", "S1", "S2"];
  const validAlphabet = ["0", "1", "2"];

  test("returns empty array for valid transition", () => {
    expect(validateTransitions(validStates, validAlphabet, [
      ["S0", "0", "S0"],
      ["S0", "1", "S1"],
      ["S0", "2", "S2"],
    ])).toEqual([]);
  });

  test("returns error for missing transitions", () => {
    expect(validateTransitions(validStates, validAlphabet)).toContainEqual(expect.objectContaining({
      message: transitionFnErrors.noEntry
    }));
  });

  test("returns error for transition with bad end state", () => {
    expect(validateTransitions(validStates, validAlphabet, [
      ["S0", "0", "S0"],
      ["S0", "1", "S1"],
      ["S0", "2", "S3"],
    ])).toContainEqual(expect.objectContaining({
      message: transitionFnErrors.missingEndingState
    }));
  });

  test("returns error for transition with start end state", () => {
    expect(validateTransitions(validStates, validAlphabet, [
      ["S0", "0", "S0"],
      ["S3", "1", "S1"],
      ["S0", "2", "S2"],
    ])).toContainEqual(expect.objectContaining({
      message: transitionFnErrors.missingStartingState
    }));
  });

  test("returns error for transition with bad alphabet", () => {
    expect(validateTransitions(validStates, validAlphabet, [
      ["S0", "0", "S0"],
      ["S3", "1", "S1"],
      ["S0", "3", "S2"],
    ])).toContainEqual(expect.objectContaining({
      message: transitionFnErrors.missingTransition
    }));
  });

  test("returns multiple errors", () => {
    expect(validateTransitions(validStates, validAlphabet, [
      ["S7", "8", "S9"],
      ["S10", "11", "S12"]
    ])).toHaveLength(6)
  });
});