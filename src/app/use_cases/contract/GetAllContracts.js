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
        const internalError = new Error("Internal Error");
        internalError.CODE = "INTERNAL_ERROR";
        internalError.message = "Internal Error";
        internalError.details = error.original.detail;
        throw internalError;
      }
      throw error;
    }
  }
}

module.exports = GetAllContracts;
