class CargoAllResourcesDomainService {
  constructor({ cargoRepository, contractRepository, resourceRepository }) {
    this.cargoRepo = cargoRepository;
    this.contractRepo = contractRepository;
    this.resourceRepo = resourceRepository;
  }

  getAllResourcesByCargoId = async (cargoId) => {
    const cargo = await this.cargoRepo.getById(cargoId);
    let cargoAllResources = {
      water: 0,
      food: 0,
      minerals: 0,
    };

    for (let id of cargo.resourceIds) {
      const resource = await this.resourceRepo.getById(id);
      cargoAllResources[resource.name] += resource.weight;
    }
    return cargoAllResources;
  };

  getAllResourcesByContractId = async (id) => {
    const contract = await this.contractRepo.getById(id);
    return this.getAllResourcesByCargoId(contract.cargoId);
  };

  getAllResourcesByPilotCertification = async (pilotCertification) => {
    const contracts = await this.contractRepo.getByPilotCertification(
      pilotCertification
    );

    let totalCargo = {
      water: 0,
      food: 0,
      minerals: 0,
    };
    for (let contract of contracts) {
      if (contract.isInProgress()) {
        let cargo = await this.getAllResourcesByContractId(contract.id);
        totalCargo.water += cargo.water;
        totalCargo.food += cargo.food;
        totalCargo.minerals += cargo.minerals;
      }
    }
    return totalCargo;
  };
}

module.exports = CargoAllResourcesDomainService;
