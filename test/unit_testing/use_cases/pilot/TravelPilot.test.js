const TravelPilot = require("../../../../src/app/use_cases/pilot/TravelPilot");

describe("TravelPilot Tests", () => {
  describe("_travelFuelCost", () => {
    const travelPilot = new TravelPilot(null, null);
    describe("If origin planet is Andvari", () => {
      it("returns 0 when destination planet is Andvari", () => {
        expect(travelPilot._travelFuelCost("Andvari", "Andvari")).toEqual(0);
      });
      it("returns 43 when destination planet is Demeter", () => {
        expect(travelPilot._travelFuelCost("Andvari", "Demeter")).toEqual(43);
      });
      it("returns 13 when destination planet is Aqua", () => {
        expect(travelPilot._travelFuelCost("Andvari", "Aqua")).toEqual(13);
      });
      it("returns 23 when destination planet is Calas", () => {
        expect(travelPilot._travelFuelCost("Andvari", "Calas")).toEqual(23);
      });
    });

    describe("If origin planet is Demeter", () => {
      it("returns 45 when destination planet is Andvari", () => {
        expect(travelPilot._travelFuelCost("Demeter", "Andvari")).toEqual(45);
      });
      it("returns 0 when destination planet is Demeter", () => {
        expect(travelPilot._travelFuelCost("Demeter", "Demeter")).toEqual(0);
      });
      it("returns 22 when destination planet is Aqua", () => {
        expect(travelPilot._travelFuelCost("Demeter", "Aqua")).toEqual(22);
      });
      it("returns 25 when destination planet is Calas", () => {
        expect(travelPilot._travelFuelCost("Demeter", "Calas")).toEqual(25);
      });
    });

    describe("If origin planet is Aqua", () => {
      it("returns 32 when destination planet is Andvari", () => {
        expect(travelPilot._travelFuelCost("Aqua", "Andvari")).toEqual(32);
      });
      it("returns 30 when destination planet is Demeter", () => {
        expect(travelPilot._travelFuelCost("Aqua", "Demeter")).toEqual(30);
      });
      it("returns 0 when destination planet is Aqua", () => {
        expect(travelPilot._travelFuelCost("Aqua", "Aqua")).toEqual(0);
      });
      it("returns 12 when destination planet is Calas", () => {
        expect(travelPilot._travelFuelCost("Aqua", "Calas")).toEqual(12);
      });
    });

    describe("If origin planet is Calas", () => {
      it("returns 20 when destination planet is Andvari", () => {
        expect(travelPilot._travelFuelCost("Calas", "Andvari")).toEqual(20);
      });
      it("returns 25 when destination planet is Demeter", () => {
        expect(travelPilot._travelFuelCost("Calas", "Demeter")).toEqual(25);
      });
      it("returns 15 when destination planet is Aqua", () => {
        expect(travelPilot._travelFuelCost("Calas", "Aqua")).toEqual(15);
      });
      it("returns 0 when destination planet is Calas", () => {
        expect(travelPilot._travelFuelCost("Calas", "Calas")).toEqual(0);
      });
    });
  });
});
