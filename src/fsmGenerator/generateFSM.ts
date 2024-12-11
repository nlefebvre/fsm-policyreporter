import readline from 'readline';
import { readFile } from "fs/promises";
import { FSMGenerator } from './FSMGenerator';
import { ErrorMsg, validateAll, validateAlphabet, validateFinalStates, validateInitialState, validateStates, validateTransitions } from './InputValidators';


async function readJsonFile(path: string) {
  const file = await readFile(path, "utf8");
  return JSON.parse(file);
}

export const fromJSON = async (fileName: string) => {
  const jsonFile = await readJsonFile(fileName)
  const errors = validateAll(jsonFile);
  if (errors.length > 0) {
    console.error(generateErrorMessage("Error generating FSM from JSON", errors));
  } else {
    console.log(`Successfully loaded ${jsonFile.title ?? 'finite state machine'}`);
    const { states, initialState, finalStates, transitions } = jsonFile;
    return new FSMGenerator(states, initialState, finalStates, transitions as [string, string, string][]);
  }
}



export const fromInput = async () => {
  const q = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ask = (msg: string): Promise<string> => new Promise(resolve =>
    q.question(msg, response => resolve(response))
  );

  const states = await getInput(async () => {
    const statesInput = await ask("Input State Values (comma delimited):");
    const states = statesInput.split(",").filter((state) => state !== '');
    return states;
  }, validateStates);

  const alphabet = await getInput(async () => {
    const alphabetInput = await ask("Input Alphabet (each character will be included):");
    return alphabetInput.split("");
  }, validateAlphabet);

  const initialState = await getInput(async () => {
    return await ask("Input initial state. Must be values previously entered state list:");
  }, (initState: string) => {
    return validateInitialState(states, initState);
  });

  const finalStates = await getInput(async () => {
    const finalStateInput = await ask("Input final states (comma delimited). Must be values previously entered state list:");
    return finalStateInput.split(",").filter((state) => state !== '');;
  }, (finStates: Array<string>) => {
    return validateFinalStates(states, finStates);
  });


  const ingestTransition = async (transitions: Array<[string, string, string]>) => {
    const transitionInput = await ask("Input transition(comma delimited as startState, alphabet, endState). blank line once complete:");
    if (transitionInput) {
      const [start, alphabet, end] = transitionInput.split(",", 3)
      transitions.push([start, alphabet, end]);
      return ingestTransition(transitions);
    }
    return transitions;
  }

  const transitions = await getInput(async () => {
    return await ingestTransition([]);
  }, (trans: Array<[string, string, string]>) => {
    return validateTransitions(states, alphabet, trans)
  });

  q.close();
  return new FSMGenerator(states, initialState, finalStates, transitions)
}


const getInput = async <T>(inputFn: () => Promise<T>, validateFn: (input: T) => Array<ErrorMsg>) => {
  const input = await inputFn();
  const errs = validateFn(input);
  if (errs.length > 0) {
    console.log();
    console.error(generateErrorMessage("Error(s) with input", errs))
    console.log('Please re-enter.');
    return getInput(inputFn, validateFn);
  }
  return input;

}



const generateErrorMessage = (title: string, errors: Array<ErrorMsg>) => {
  return errors.reduce<string>((errorString, { type, message, inputValue }) => {
    return errorString += `    ${type}: ${message} ${inputValue !== null ? `(For value '${inputValue}')` : ''}\n`
  }, title + "\n")
}