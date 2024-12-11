import * as GenerateFSM from "../../../src/fsmGenerator/GenerateFSM";

describe("GenerateFSM Tests", () => {
  describe("fromInput", () => {
    // TODO: write tests mocking commandline inputs
  });

  describe("fromJSON", () => {
    test("imports file", async () => {
      const mock = jest.spyOn(GenerateFSM, 'readJsonFile');
      mock.mockImplementation(() => Promise.resolve(import('../../../exampleFSM/ModuloThree.json')));
      const fsm = await GenerateFSM.fromJSON("filename");

      expect(fsm).toBeDefined();
    });

    test("logs error for bad input", async () => {
      const errorSpy = jest.spyOn(global.console, 'error');
      const mock = jest.spyOn(GenerateFSM, 'readJsonFile');
      mock.mockImplementation(() => Promise.resolve({
        states: [],
        alphabet: [],
        finalStates: [],
        transitions: []
      }));
      await GenerateFSM.fromJSON("filename");

      expect(errorSpy).toHaveBeenCalledTimes(1);
    });
  });
});