enum FSMPart {
  STATE = "State",
  ALPHABET = "Alphabet",
  TRANSITION_FN = "Transition function"
}

export interface ErrorMsg {
  inputValue: string | Array<string> | null;
  type: FSMPart;
  message: string;
}


export const stateErrors = {
  duplicateEntries: "Duplicate States exist in state list",
  noEntries: "Must include at least one state"
}

const findDuplicate = (set: Array<string>): Array<string> => {
  const values: Array<string> = [];
  return set.reduce<Array<string>>((dupes, value) => {
    if (values.includes(value)) {
      dupes.push(value);
    } else {
      values.push(value);
    }
    return dupes;
  }, []);
}


export const validateStates = (stateArray?: Array<string>): Array<ErrorMsg> => {
  // empty array
  if (!stateArray || stateArray.length === 0) {
    return [
      {
        inputValue: null,
        type: FSMPart.STATE,
        message: stateErrors.noEntries
      }
    ]
  }

  // duplicate state
  // TODO ignorable error?
  const dupes = findDuplicate(stateArray);
  return dupes.map((dupe) => {
    return {
      inputValue: dupe,
      type: FSMPart.STATE,
      message: stateErrors.duplicateEntries
    }
  });
}

export const alphabetErrors = {
  noEntries: "Must include at east one alphabet",
  duplicateEntries: "Duplicate alphabet character exist in state list",

}

export const validateAlphabet = (alphabetArray: Array<string>): Array<ErrorMsg> => {
  // empty array
  if (!alphabetArray || alphabetArray.length === 0) {
    return [
      {
        inputValue: null,
        type: FSMPart.ALPHABET,
        message: alphabetErrors.noEntries
      }
    ]
  }

  // duplicate alphabet chars
  // TODO ignorable error?
  const dupes = findDuplicate(alphabetArray);

  return dupes.map((dupe) => {
    return {
      inputValue: dupe,
      type: FSMPart.ALPHABET,
      message: alphabetErrors.duplicateEntries
    };
  });

}


export const initialStateErrors = {
  invalidState: "Initial state does not exist on state list",
  noState: "Must include an initial state",
}

export const validateInitialState = (stateArray: Array<string>, initialState: string): Array<ErrorMsg> => {
  if (!initialState || initialState === "") {
    return [
      {
        inputValue: null,
        type: FSMPart.STATE,
        message: initialStateErrors.noState
      }
    ]
  }

  if (!stateArray.includes(initialState)) {
    return [
      {
        inputValue: initialState,
        type: FSMPart.STATE,
        message: initialStateErrors.invalidState
      }
    ]
  }
  return [];
}


export const finalStateErrors = {
  invalidState: "Final state(s) don't exist on state list",
  noState: "Must include a final state",
}

export const validateFinalStates = (stateArray: Array<string>, finalStateArray: Array<string>): Array<ErrorMsg> => {
  if (!finalStateArray || finalStateArray.length === 0) {
    return [
      {
        inputValue: null,
        type: FSMPart.STATE,
        message: finalStateErrors.noState
      }
    ]
  }
  const errors: Array<ErrorMsg> = [];

  finalStateArray.forEach((finalState) => {
    if (!stateArray.includes(finalState)) {
      errors.push({
        inputValue: finalState,
        type: FSMPart.STATE,
        message: finalStateErrors.invalidState
      });
    }
  })

  return errors;
}


export const transitionFnErrors = {
  noEntry: "No transitions found",
  missingStartingState: "Transition has invalid starting state",
  missingEndingState: "Transition has invalid ending state",
  missingTransition: "Transition value does not exist in alphabet"
};

export const validateTransitions = (stateArray: Array<string>, alphabet: Array<string>, transitions?: Array<[string, string, string]>): Array<ErrorMsg> => {
  const errors: Array<ErrorMsg> = [];

  if (!transitions) {
    return [
      {
        inputValue: null,
        type: FSMPart.STATE,
        message: transitionFnErrors.noEntry
      }
    ]
  }

  transitions.forEach(([startingState, transitionVal, endingState]) => {

    if (!stateArray.includes(startingState)) {
      errors.push({
        inputValue: startingState,
        type: FSMPart.STATE,
        message: transitionFnErrors.missingStartingState
      });
    }


    if (!stateArray.includes(endingState)) {
      errors.push({
        inputValue: endingState,
        type: FSMPart.STATE,
        message: transitionFnErrors.missingEndingState
      });
    }


    if (!alphabet.includes(transitionVal)) {
      errors.push({
        inputValue: transitionVal,
        type: FSMPart.STATE,
        message: transitionFnErrors.missingTransition
      });
    }
  })

  return errors;
}

export const validateAll = (json: Record<string, any>) => {
  const errors = []
  errors.push(...validateStates(json.states));
  errors.push(...validateAlphabet(json.alphabet));
  errors.push(...validateInitialState(json.states, json.initialState));
  errors.push(...validateFinalStates(json.states, json.finalStates));
  errors.push(...validateTransitions(json.states, json.alphabet, json.transitions));
  return errors;
}