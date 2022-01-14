const AcceptContract = require("../../../../src/app/use_cases/contract/AcceptContract");

describe("AcceptContract Tests", () => {
  const acceptContract = new AcceptContract(null, null, null, null);
  describe("_isPossibleToShipCarry", () => {
    describe("If actual ship weight and total contract weight is smaller than ship weight capacity", () => {
      it("returns true", () => {
        expect(acceptContract._isPossibleToShipCarry(400, 200, 100)).toEqual(true);
      });
    });

    describe("If actual ship weight and total contract weight is equal than ship weight capacity", () => {
      it("returns true", () => {
        expect(acceptContract._isPossibleToShipCarry(400, 200, 200)).toEqual(true);
      });
    });

    describe("If actual ship weight and total contract weight is greater than ship weight capacity", () => {
      it("returns false", () => {
        expect(acceptContract._isPossibleToShipCarry(400, 300, 200)).toEqual(false);
      });
    });
  });
});
