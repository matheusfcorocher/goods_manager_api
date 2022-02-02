const PilotSerializer = require("../../../../../src/interfaces/http/controllers/serializers/PilotSerializer");
const { DataFactory } = require("../../../../support/factories/data");
const dataFactory = new DataFactory();

describe("Interfaces :: HTTP :: Pilot :: PilotSerializer", () => {
  it("returns id, pilotCertification, name, age, credits, locationPlanet", () => {
    const data = {
      id: 1,
      pilotCertification: 1234567,
      name: "TestMe",
      age: 12,
      credits: 1000,
      locationPlanet: "Aqua",
    };

    const serializedPilot = PilotSerializer.serialize(data);

    expect(serializedPilot).toEqual(data);
  });

  it("ignores extra attributes", () => {
    const data = {
      id: 1,
      pilotCertification: 1234567,
      name: "TestMe",
      age: 12,
      credits: 1000,
      locationPlanet: "Aqua",
      unknown: "test",
    };

    const serializedPilot = PilotSerializer.serialize(data);
    data.unknown = undefined;

    expect(serializedPilot).toEqual(data);
  });

  it("is able to serialize pilot entity instances", () => {
    const data = {
        id: 1,
        pilotCertification: 1234567,
        name: "TestMe",
        age: 12,
        credits: 1000,
        locationPlanet: "Aqua"
    };
    const pilot = dataFactory.create("Pilot", data);

    const serializedPilot = PilotSerializer.serialize(pilot);

    expect(serializedPilot).toEqual(data);
  });
});
