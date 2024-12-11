import { alphabetErrors, validateAlphabet } from "../../../src/validation/InputValidators";

describe("Alphabet Validation Tests", () => {

  test("returns empty array for valid alphabet", () => {
    expect(validateAlphabet(["0", "1"])).toEqual([]);
  });

  test("returns error for empty alphabet list", () => {
    expect(validateAlphabet([])).toContainEqual(expect.objectContaining({
      message: alphabetErrors.noEntries
    }));
  });

  test("returns error for alphabet list with duplicates", () => {
    expect(validateAlphabet(["0", "1", "2", "3", "0"])).toContainEqual(expect.objectContaining({
      message: alphabetErrors.duplicateEntries
    }));
  });

  test("returns multiple errors for multiple duplicates", () => {
    expect(validateAlphabet(["0", "1", "2", "3", "4", "0", "1", "2", "3", "4"])).toHaveLength(5);
  });
});