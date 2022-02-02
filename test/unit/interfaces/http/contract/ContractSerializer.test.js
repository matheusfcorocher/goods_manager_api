const ContractSerializer = require("../../../../../src/interfaces/http/controllers/serializers/ContractSerializer");
const { DataFactory } = require("../../../../support/factories/data");
const dataFactory = new DataFactory();

describe("Interfaces :: HTTP :: Contract :: ContractSerializer", () => {
  it("returns id, pilotCertification, cargoId, description, originPlanet, destinationPlanet, value and contract status", () => {
    const data = {
      id: 1,
      pilotCertification: 1234567,
      cargoId: 1,
      description: "This is a test",
      originPlanet: "Andvari",
      destinationPlanet: "Calas",
      value: 2000,
      contractStatus: "CREATED",
    };

    const serializedContract = ContractSerializer.serialize(data);

    expect(serializedContract).toEqual(data);
  });

  it("ignores extra attributes", () => {
    const data = {
      id: 1,
      pilotCertification: 1234567,
      cargoId: 1,
      description: "This is a test",
      originPlanet: "Andvari",
      destinationPlanet: "Calas",
      value: 2000,
      contractStatus: "CREATED",
      unknown: "test",
    };

    const serializedContract = ContractSerializer.serialize(data);
    data.unknown = undefined;

    expect(serializedContract).toEqual(data);
  });

  it("is able to serialize contract entity instances", () => {
    const data = {
      id: 1,
      pilotCertification: 1234567,
      cargoId: 1,
      description: "This is a test",
      originPlanet: "Andvari",
      destinationPlanet: "Calas",
      value: 2000,
      contractStatus: "CREATED",
    };
    const contract = dataFactory.create("Contract", data);

    const serializedContract = ContractSerializer.serialize(contract);

    expect(serializedContract).toEqual(data);
  });
});
