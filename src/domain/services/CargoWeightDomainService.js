class CargoWeightDomainService {
  constructor({ cargoRepository, contractRepository, resourceRepository }) {
    this.cargoRepo = cargoRepository;
    this.contractRepo = contractRepository;
    this.resourceRepo = resourceRepository;
  }

  getCargoWeight = async (cargoId) => {
    const cargo = await this.cargoRepo.getById(cargoId);
    let cargoWeight = 0;
    for (let id of cargo.resourceIds) {
      const resource = await this.resourceRepo.getById(id);
      cargoWeight += resource.weight;
    }
    return cargoWeight;
  };

  getCargoWeightContract = async (id) => {
    const contract = await this.contractRepo.getById(id);
    return await this.getCargoWeight(contract.cargoId);
  };

  getCargoWeightPilot = async (pilotCertification) => {
    const contracts = await this.contractRepo.getByPilotCertification(
      pilotCertification
    );

    let cargoWeightPilot = 0;
    for (let contract of contracts) {
      if (contract.isInProgress())
        cargoWeightPilot += await this.getCargoWeightContract(contract.id);
    }
    return cargoWeightPilot;
  };
}

module.exports = CargoWeightDomainService;