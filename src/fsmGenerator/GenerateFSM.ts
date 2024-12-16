import readline from 'readline';
import { readFile } from "fs/promises";
import { validateAlphabet, validateFinalStates, validateInitialState, validateStates, validateTransitions } from '../validation/InputValidators';
import { ErrorMsg, generateErrorMessage } from '../validation/Errors';
import { FSMGenerator } from './FSMGenerator';


export const readJsonFile = async (path: string) => {
  const file = await readFile(path, "utf8");
  return JSON.parse(file);
}

export const fromJSON = async (fileName: string) => {
  const { states, alphabet, initialState, finalStates, transitions, title } = await readJsonFile(fileName);
  try {
    const fsm = new FSMGenerator()
      .addStates(states)
      .addAlphabet(alphabet)
      .setInitialState(initialState)
      .addFinalStates(finalStates)
      .addTransitions(transitions)
      .build();

    console.log(`Successfully loaded ${title ?? 'finite state machine'}`);
    return fsm;

  } catch (e) {
    console.error(e);
  }
}

export const fromInput = async () => {
  const fsmGenerator = new FSMGenerator();

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
  fsmGenerator.addStates(states);

  const alphabet = await getInput(async () => {
    const alphabetInput = await ask("Input Alphabet (each character will be included):");
    return alphabetInput.split("");
  }, validateAlphabet);
  fsmGenerator.addAlphabet(alphabet);

  const initialState = await getInput(async () => {
    return await ask("Input initial state. Must be values previously entered state list:");
  }, (initState: string) => {
    return validateInitialState(states, initState);
  });
  fsmGenerator.setInitialState(initialState);

  const finalStates = await getInput(async () => {
    const finalStateInput = await ask("Input final states (comma delimited). Must be values previously entered state list:");
    return finalStateInput.split(",").filter((state) => state !== '');;
  }, (finStates: Array<string>) => {
    return validateFinalStates(states, finStates);
  });
  fsmGenerator.addFinalStates(finalStates);

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
  fsmGenerator.addTransitions(transitions);

  q.close();
  return fsmGenerator.build();
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

