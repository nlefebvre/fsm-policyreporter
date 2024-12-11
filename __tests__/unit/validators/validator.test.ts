import * as validators from "../../../src/validation/InputValidators";
const { validateAll } = validators;

describe("Validation Tests", () => {
  const states = ["S0", "S1", "S2"];
  const alphabet = ["0", "1", "2"];
  const initialState = "S0";
  const finalStates = ["S0", "S1", "S2"];
  const transitions = [
    ["S0", "0", "S0"],
    ["S0", "1", "S0"],
    ["S1", "0", "S2"],
    ["S1", "1", "S0"],
    ["S2", "0", "S1"],
    ["S2", "1", "S2"]
  ];

  test("returns empty array for valid object", () => {
    expect(validateAll({
      states,
      alphabet,
      initialState,
      finalStates,
      transitions
    })).toEqual([]);
  });

  test("returns empty array for valid object", () => {
    const stateSpy = jest.spyOn(validators, "validateStates");
    const alphabetSpy = jest.spyOn(validators, "validateAlphabet");
    const initialSpy = jest.spyOn(validators, "validateInitialState");
    const finalSpy = jest.spyOn(validators, "validateFinalStates");
    const transSpy = jest.spyOn(validators, "validateTransitions");

    validateAll({});

    expect(stateSpy).toHaveBeenCalledTimes(1);
    expect(alphabetSpy).toHaveBeenCalledTimes(1);
    expect(initialSpy).toHaveBeenCalledTimes(1);
    expect(finalSpy).toHaveBeenCalledTimes(1);
    expect(transSpy).toHaveBeenCalledTimes(1);
  });
});