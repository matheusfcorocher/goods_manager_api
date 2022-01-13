const Contract = require("../../../domain/entities/Contract");

const SequelizeContractMapper = {
  toEntity(dataValues) {
    const {
      id,
      pilotCertification,
      cargoId,
      description,
      originPlanet,
      destinationPlanet,
      value,
      contractStatus,
    } = dataValues;

    return new Contract({
      id,
      pilotCertification,
      cargoId,
      description,
      originPlanet,
      destinationPlanet,
      value,
      contractStatus,
    });
  },
  toDatabase(contract) {
    const {
      cargoId,
      description,
      originPlanet,
      destinationPlanet,
      value,
      contractStatus
    } = contract;
    return {
      cargoId,
      description,
      originPlanet,
      destinationPlanet,
      value,
      contractStatus,
    };
  },
};

module.exports = SequelizeContractMapper;
