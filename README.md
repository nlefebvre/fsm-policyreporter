# Policy Reporter Finite State Automaton
A simple project that take as input a 5-tuple and outputs a Finite State Machine, which then can be given a string as input, and will produce the output. The 5-tuple input is as follows:
Q is
; Σ is a finite input alphabet;
 is the initial state;

| Tuple Input | Description| Example |
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
After copying to your machine (cloning). From the root folder:
```console
npm i
npm start
```

#### Manually input a FSM

#### Using FSM in an input file

#### Developer API


### Running tests
From the root folder:
```
npm run test
```

### Future Plans
* Run local server
* Allow More rigorous validation, validation flags
* Support adding/editing/removing states, transitions, etc.


### Assumptions
* Alphabets are sets of *single characters*. They cannot be multiple characters, nor have duplicate characters.