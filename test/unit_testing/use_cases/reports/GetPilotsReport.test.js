const GetPilotsReport = require("../../../../src/app/use_cases/reports/GetPilotsReport");
const Pilot = require("../../../../src/domain/entities/Pilot");

describe("GetPilotsReport Tests", () => {
  const getPilotsReport = new GetPilotsReport(null, null, null, null);
  describe("_getPercentage", () => {
    describe("when passes a numerator and denominator", () => {
      it("returns correctly percentage", () => {
        expect(getPilotsReport._getPercentage(1, 100)).toEqual(1.0);
      });
    });
  });

  describe("_reportFormat", () => {
    const pilot = new Pilot({ id: 1, pilotCertification: 1234567 });
    describe("when passes a pilot", () => {
      it("returns correctly data format", () => {
        expect(getPilotsReport._reportFormat(pilot)).toEqual({
          id: pilot.id,
          pilotCertification: pilot.pilotCertification,
          transporting: {
            water: 0,
            food: 0,
            minerals: 0,
          },
        });
      });
    });
  });
});
