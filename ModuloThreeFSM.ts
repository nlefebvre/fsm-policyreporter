const states = ['S0', "S1", "S2"]
const alphabet = ['0', "1"]
const initialState = "S0"
const finalStates = ['S0', "S1", "S2"];
const transitions = {
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

const modThree = (input: string) => {
  const inputArray = Array.from(input);
  const validateInput = inputArray.every((char: string) => alphabet.includes(char));
  // if invalid  break

  let currentState = initialState;
  inputArray.forEach((char) => {
    currentState = transitions[currentState][char]
  })

  if (finalStates.includes(currentState)) {
    return currentState;
  }
}