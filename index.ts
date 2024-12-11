import { fromInput, fromJSON } from "./src/fsmGenerator/generateFSM";
import { modThree } from "./src/ModuloThreeFSM";
import readline from 'readline';

const getFileName = () => {
  return process.argv[2];
}

const fileName = getFileName();
let fsm;

if (fileName) {
  fsm = await fromJSON(fileName);
} else {
  fsm = await fromInput();
}


const q = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (msg: string) => new Promise(resolve =>
  q.question(msg, response => resolve(response))
);

const processFSMInput = async () => {
  const res = await ask("Input: ");
  if (res && typeof res === "string") {
    const state = fsm!.handleInput(res);
    if (state.isFinal()) {
      console.log(state.value);
    } else {
      console.log(`Error: state '${state.value}' is not a final state`);
    }
    fsm!.reset();
    processFSMInput();
  } else {
    q.close()
  }
}

console.log('Submit value to generated finite state machine:');
processFSMInput();

