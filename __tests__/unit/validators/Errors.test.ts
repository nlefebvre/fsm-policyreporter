
import { FSMPart, generateErrorMessage } from "../../../src/validation/Errors";

describe("generateErrorMessage Tests", () => {
  test("generates error for empty string", () => {
    expect(generateErrorMessage("", [])).toMatchInlineSnapshot(`
"
"
`)
  });


  test("generates message for single error", () => {
    expect(generateErrorMessage("Test error", [{
      type: FSMPart.ALPHABET,
      message: "test message",
      inputValue: "value"
    }])).toMatchSnapshot();
  });

  test("generates message for multiple errors", () => {
    expect(generateErrorMessage("Test error", [
      {
        type: FSMPart.ALPHABET,
        message: "test alphabet message",
        inputValue: null
      },
      {
        type: FSMPart.STATE,
        message: "test state message",
        inputValue: null
      },
      {
        type: FSMPart.TRANSITION_FN,
        message: "test tnfn message",
        inputValue: "value"
      },
    ])).toMatchSnapshot();
  });

});