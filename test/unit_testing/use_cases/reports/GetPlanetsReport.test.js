const GetPlanetsReport = require("../../../../src/app/use_cases/reports/GetPlanetsReport");

describe("GetPlanetsReport Tests", () => {
  const getPlanetsReport = new GetPlanetsReport(null, null, null);

  describe("_reportFormat", () => {
    const planets = {
      URANUS: "Uranus",
      NEPTUNE: "Neptune",
    };
    describe("when passes planets", () => {
      it("returns correctly data format", () => {
        const resourceData = {
            sent: {
              water: 0,
              food: 0,
              minerals: 0,
            },
            received: {
              water: 0,
              food: 0,
              minerals: 0,
            },
          };
        const result = {
          Uranus: resourceData,
          Neptune: resourceData,
        };
        expect(getPlanetsReport._reportFormat(planets)).toEqual(result);
      });
    });
  });
});
