const ContractSerializer = {
  serialize({
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
  },
};

module.exports = ContractSerializer;
