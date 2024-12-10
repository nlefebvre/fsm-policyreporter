const states = ['S0', "S1", "S2"]
const alphabet = ['0', "1"]
const initialState = "S0"
const finalStates = ['S0', "S1", "S2"];
const transitions: Record<typeof states[0], Record<typeof alphabet[0], typeof states[0]>> = {
  "S0": {
    "0": "S0",
    "1": "S1",
  },
  "S1": {
    "0": "S2",
    "1": "S0",
  },
  "S2": {
    "0": "S1",
    "1": "S2",
  },
}

export const modThree = (input: string) => {
  const inputArray = Array.from(input);
  const validateInput = inputArray.every((char: string) => alphabet.includes(char));
  // if invalid  break
  if (!validateInput) {
    throw Error(`Invalid character in input ${input}`);
  }

  let currentState = initialState;
  inputArray.forEach((char) => {
    const newState = transitions[currentState][char]
    if (!newState) {
      throw Error(`Invalid transition. Current state ${currentState}, input character ${char}`);
    }
    currentState = newState;
  })

  if (finalStates.includes(currentState)) {
    return currentState;
  } else {
    return `invalid final state ${currentState}`;
  }

}

