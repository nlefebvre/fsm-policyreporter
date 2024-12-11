import { fromInput, fromJSON } from "./src/fsmGenerator/generateFSM";
import { modThree } from "./src/ModuloThreeFSM";
import readline from 'readline';

const binaryToDec = (bin: string) => {
  Array.from(bin).every((char) => char === "0" || char === "1")
  return parseInt(bin, 2);
}


const fsm = fromJSON();
// const fsm = await fromInput();

if (fsm) {



  const q = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const ask = (msg: string) => new Promise(resolve =>
    q.question(msg, response => resolve(response))
  );

  const modThreeLoop2 = async () => {
    const res = await ask("Input: ");
    if (res && typeof res === "string") {
      const state = fsm!.handleInput(res);
      if (state.isFinal()) {
        console.log(state.value);
      } else {
        console.log(`Error: state '%{state.value}' is not a final state`);
      }
      fsm!.reset();

      const decimal = binaryToDec(res);
      console.log(`binary ${res} => ${decimal} % 3 is ${decimal % 3}`);
      modThreeLoop2();
    } else {
      q.close()
    }
  }

  console.log('Submit value to generated state machine:');
  modThreeLoop2();
}
