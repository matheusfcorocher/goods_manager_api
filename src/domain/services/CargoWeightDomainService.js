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

// const makeGetCargoWeight = (cargoRepo, resourceRepo) => {
//   const getCargoWeight = async (cargoId) => {
//     const cargo = await cargoRepo.getById(cargoId);
//     let cargoWeight = 0;
//     for (let id of cargo.resourceIds) {
//       const resource = await resourceRepo.getById(id);
//       cargoWeight += resource.weight;
//     }
//     return cargoWeight;
//   };

//   return getCargoWeight;
// };

// const makeGetCargoWeightContract = (cargoRepo, contractRepo, resourceRepo) => {
//   const getCargoWeightContract = async (id) => {
//     const contract = await contractRepo.getById(id);
//     const getCargoWeight = await makeGetCargoWeight(cargoRepo, resourceRepo);
//     return await getCargoWeight(contract.cargoId);
//   };

//   return getCargoWeightContract;
// };

// const makeGetCargoWeightPilot = (cargoRepo, contractRepo, resourceRepo) => {
//   const getCargoWeightPilot = async (pilotCertification) => {
//     const contracts = await contractRepo.getByPilotCertification(
//       pilotCertification
//     );
//     const getCargoWeightContract = await makeGetCargoWeightContract(
//       cargoRepo,
//       contractRepo,
//       resourceRepo
//     );
//     let cargoWeightPilot = 0;
//     for (let contract of contracts) {
//       if (contract.isInProgress())
//         cargoWeightPilot += await getCargoWeightContract(contract.id);
//     }
//     return cargoWeightPilot;
//   };

//   return getCargoWeightPilot;
// };
