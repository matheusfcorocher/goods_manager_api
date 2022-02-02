const ShipSerializer = require("../../../../../src/interfaces/http/controllers/serializers/ShipSerializer");
const { DataFactory } = require("../../../../support/factories/data");
const dataFactory = new DataFactory();

describe("Interfaces :: HTTP :: Ship :: ShipSerializer", () => {
  it("returns id, pilotCertification, fuelCapacity, fuelLevel, weightCapacity", () => {
    const data = {
      id: 1,
      pilotCertification: 1234567,
      fuelCapacity: 1000,
      fuelLevel: 1000,
      weightCapacity: 1000,
    };

    const serializedShip = ShipSerializer.serialize(data);

    expect(serializedShip).toEqual(data);
  });

  it("ignores extra attributes", () => {
    const data = {
      id: 1,
      pilotCertification: 1234567,
      fuelCapacity: 1000,
      fuelLevel: 1000,
      weightCapacity: 1000,
      unknown: "test",
    };

    const serializedShip = ShipSerializer.serialize(data);
    data.unknown = undefined;

    expect(serializedShip).toEqual(data);
  });

  it("is able to serialize ship entity instances", () => {
    const data = {
      id: 1,
      pilotCertification: 1234567,
      fuelCapacity: 1000,
      fuelLevel: 1000,
      weightCapacity: 1000,
    };
    const ship = dataFactory.create("Ship", data);

    const serializedShip = ShipSerializer.serialize(ship);

    expect(serializedShip).toEqual(data);
  });
});
