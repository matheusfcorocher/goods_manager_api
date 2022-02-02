const TravelFuelCostDomainService = require("../../../../src/domain/services/TravelFuelCostDomainService");

describe("Domain :: Service :: TravelFuelCostDomainService", () => {
  describe("If origin planet is Andvari", () => {
    it("returns 0 when destination planet is Andvari", () => {
      expect(TravelFuelCostDomainService("Andvari", "Andvari")).toEqual(0);
    });
    it("returns 43 when destination planet is Demeter", () => {
      expect(TravelFuelCostDomainService("Andvari", "Demeter")).toEqual(43);
    });
    it("returns 13 when destination planet is Aqua", () => {
      expect(TravelFuelCostDomainService("Andvari", "Aqua")).toEqual(13);
    });
    it("returns 23 when destination planet is Calas", () => {
      expect(TravelFuelCostDomainService("Andvari", "Calas")).toEqual(23);
    });
  });

  describe("If origin planet is Demeter", () => {
    it("returns 45 when destination planet is Andvari", () => {
      expect(TravelFuelCostDomainService("Demeter", "Andvari")).toEqual(45);
    });
    it("returns 0 when destination planet is Demeter", () => {
      expect(TravelFuelCostDomainService("Demeter", "Demeter")).toEqual(0);
    });
    it("returns 22 when destination planet is Aqua", () => {
      expect(TravelFuelCostDomainService("Demeter", "Aqua")).toEqual(22);
    });
    it("returns 25 when destination planet is Calas", () => {
      expect(TravelFuelCostDomainService("Demeter", "Calas")).toEqual(25);
    });
  });

  describe("If origin planet is Aqua", () => {
    it("returns 32 when destination planet is Andvari", () => {
      expect(TravelFuelCostDomainService("Aqua", "Andvari")).toEqual(32);
    });
    it("returns 30 when destination planet is Demeter", () => {
      expect(TravelFuelCostDomainService("Aqua", "Demeter")).toEqual(30);
    });
    it("returns 0 when destination planet is Aqua", () => {
      expect(TravelFuelCostDomainService("Aqua", "Aqua")).toEqual(0);
    });
    it("returns 12 when destination planet is Calas", () => {
      expect(TravelFuelCostDomainService("Aqua", "Calas")).toEqual(12);
    });
  });

  describe("If origin planet is Calas", () => {
    it("returns 20 when destination planet is Andvari", () => {
      expect(TravelFuelCostDomainService("Calas", "Andvari")).toEqual(20);
    });
    it("returns 25 when destination planet is Demeter", () => {
      expect(TravelFuelCostDomainService("Calas", "Demeter")).toEqual(25);
    });
    it("returns 15 when destination planet is Aqua", () => {
      expect(TravelFuelCostDomainService("Calas", "Aqua")).toEqual(15);
    });
    it("returns 0 when destination planet is Calas", () => {
      expect(TravelFuelCostDomainService("Calas", "Calas")).toEqual(0);
    });
  });
});
