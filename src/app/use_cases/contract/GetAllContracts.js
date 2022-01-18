const { compareValues } = require("../../../lib/compareValues");

class GetAllContracts {
  constructor(contractsRepository) {
    this.contractsRepository = contractsRepository;
  }

  _serializer({
    id,
    pilotCertification,
    cargoId,
    description,
    originPlanet,
    destinationPlanet,
    value,
    contractStatus,
  }) {
    return {
      id,
      pilotCertification,
      cargoId,
      description,
      originPlanet,
      destinationPlanet,
      value,
      contractStatus,
    };
  }

  async execute(contractStatus) {
    try {
      return (await this.contractsRepository.getAll(contractStatus))
        .map((c) => this._serializer(c))
        .sort(compareValues("id", "asc"));
    } catch (error) {
      if(!error.CODE) {
        error = new Error("Internal Error");
        error.CODE = "INTERNAL_ERROR";
        error.message = "Internal Error";
      }
      throw error;
    }
  }
}

module.exports = GetAllContracts;
