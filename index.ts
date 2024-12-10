import { modThree } from "./src/ModuloThreeFSM";
import readline from 'readline';
// import inquirer from 'inquirer';
// import prompt from 'prompt-sync';

const binaryToDec = (bin: string) => {
  Array.from(bin).every((char) => char === "0" || char === "1")
  return parseInt(bin, 2);
}

const q = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// q.question('Sumbit binary for mod three\n', name => {
//   if (name !== '') {
//     console.log(modThree(name));
//   }
//   q.close();
// });


const ask = (msg: string) => new Promise(resolve =>
  q.question(msg, response => resolve(response))
);


const modThreeLoop = async () => {
  const res = await ask("Binary Value: ");
  if (res && typeof res === "string") {

    console.log("Result:", modThree(res));
    const decimal = binaryToDec(res);
    console.log(`binary ${res} => ${decimal} % 3 is ${decimal % 3}`);
    modThreeLoop();
  } else {
    q.close()
  }
}

console.log('Submit binary value to get mod 3 result, newline to exit.');
modThreeLoop();