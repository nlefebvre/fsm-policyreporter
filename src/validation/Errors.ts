export enum FSMPart {
  STATE = "State",
  ALPHABET = "Alphabet",
  TRANSITION_FN = "Transition function"
}

export interface ErrorMsg {
  inputValue: string | Array<string> | null;
  type: FSMPart;
  message: string;
}

export const generateErrorMessage = (title: string, errors: Array<ErrorMsg>) => {
  return errors.reduce<string>((errorString, { type, message, inputValue }) => {
    return errorString += `    ${type}: ${message} ${inputValue !== null ? `(For value '${inputValue}')` : ''}\n`
  }, title + "\n")
}