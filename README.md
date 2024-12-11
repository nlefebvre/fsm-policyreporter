# Policy Reporter Finite State Automaton
A project that takes as input a 5-tuple and outputs a Finite State Machine, which then can be given a string as input, and will produce the output. The 5-tuple input is as follows:

| Tuple Input | Description                       | Example      |
| :---------- | :-------------------------------- | :----------- |
| Q           | a finite set of states            | [S0, S1, S2] |
| Σ           | a finite input alphabet           | 1, 0         |
| q0 ∈ Q      | the initial state                 | S0           |
| F ⊆ Q       | the set of accepting/final states | [S0, S1, S2] |
| δ:Q×Σ→Q     | the transition functions          | `δ(S0,0) = S0;`, `δ(S0,1) = S1;`, `δ(S1,0) = S2;`, `δ(S1,1) = S0;`, `δ(S2,0) = S1;`, `δ(S2,1) = S2;` |

## Requirements
Node.js v20 or equivalent.


## Usage

### Local Installation
After copying to your machine (cloning), use npm to install from the root folder:
```console
$ npm i
```

### Option1: Using FSM from an input file
After local installation, use `npm start [filename.json]` to load existing json FSM into program. A successful prompt message will appear, and it will then prompt for input. Submit your inputs and the finite state machine will output its state following input.

```console
$ npm start ./exampleFSM/Modulo3.json

> Successfully loaded Modulo Three
> Submit value to generated finite state machine:
> Input:␣
```

### Option 2: Manually input a FSM
After local installation, use `npm start` to begin prompting. Example input are noted. As above, once complete the FSM will begin to accept inputs.

```console
$ npm start

> Input State Values (comma delimited): #S0,S1,S2
> Input Alphabet (each character will be included): #01
> Input initial state. Must be values previously entered state list: #S0
> Input final states (comma delimited). Must be values previously entered state list: #S0,S1,S2
> Input transition(comma delimited as startState, alphabet, endState). blank line once complete: #S0,0,S0
> Input transition(comma delimited as startState, alphabet, endState). blank line once complete: #S0,1,S1
> Input transition(comma delimited as startState, alphabet, endState). blank line once complete: #S1,0,S2
> Input transition(comma delimited as startState, alphabet, endState). blank line once complete: #S1,1,S0
> Input transition(comma delimited as startState, alphabet, endState). blank line once complete: #S2,0,S1
> Input transition(comma delimited as startState, alphabet, endState). blank line once complete: #S2,1,S2
> Input transition(comma delimited as startState, alphabet, endState). blank line once complete: #<newline>
> Submit value to generated finite state machine:
> Input:␣
```

### Running tests
From the root folder:
```
npm run test
```

### Future Plans

* If consumers would prefer a service to generate FSMs:
  * Create server with endpoints for submitting FSM, and submitting inputs
* If instead consumers would prefer a UI component:
  * Build UI in react with inputs for all tuples, and inputs
  * Would it be possible to visualize "graph" (state and transitions)?
* Allow more rigorous validation, validation flags:
  * Allow categorization of warnings vs errors (e.g. ius a duplicate state an error, or just a warning?)
  * Warnings instead of errors for duplication
  * Warnings for "detached" stated (0 transitions in or out)
  * Flags to strictly stop on warnings, or to bypass them
* Support adding/editing/removing states, transitions, etc.
  * Must also consider handling all other states that reference the state
* More robust alphabet options. Should multi-characters in alphabet be allowed? how to differentiate (comma-delimited, fixed widths, etc.)

### Assumptions
* Alphabets are sets of *single characters*. They cannot be multiple characters, nor have duplicate characters.

