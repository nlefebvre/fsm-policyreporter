import { modThree } from "../../src/ModuloThreeFSM";

test('adds 1 + 2 to equal 3', () => {
  expect(modThree("11")).toBe("S0");
});