const cargoRepository = require("../infra/repositories/cargo/SequelizeCargosRepository");
const resourceRepository = require("../infra/repositories/resource/SequelizeResourcesRepository");
const contractRepository = require("../infra/repositories/contract/SequelizeContractsRepository");
// const pilotRepository = require("../infra/repositories/pilot/SequelizePilotsRepository");
const models = require("../infra/database/models/index.js");

const CargoModel = models.Cargos;
const ResourceModel = models.Resources;
const ContractModel = models.Contracts;

const cargoRepo = new cargoRepository(CargoModel);
const resourceRepo = new resourceRepository(ResourceModel);
const contractRepo = new contractRepository(ContractModel);

const makeGetCargoWeight = (cargoRepo, resourceRepo) => {
  const getCargoWeight = async (cargoId) => {
    const cargo = await cargoRepo.getById(cargoId);
    let cargoWeight = 0;
    for (let id of cargo.resourceIds) {
      const resource = await resourceRepo.getById(id);
      cargoWeight += resource.weight;
    }
    return cargoWeight;
  };

  return getCargoWeight;
};

const makeGetAllResourcesCargo = (cargoRepo, resourceRepo) => {
  const getAllResourcesCargo = async (cargoId) => {
    const cargo = await cargoRepo.getById(cargoId);
    let cargoAllResources= {
      water: 0,
      food: 0,
      minerals: 0,
    };

    for (let id of cargo.resourceIds) {
      const resource = await resourceRepo.getById(id);
      cargoAllResources[resource.name] += resource.weight;
    }
    return cargoAllResources;
  };

  return getAllResourcesCargo;
};

const makeGetCargoWeightContract = (cargoRepo, contractRepo, resourceRepo) => {
  const getCargoWeightContract = async (id) => {
    const contract = await contractRepo.getById(id);
    const getCargoWeight = await makeGetCargoWeight(cargoRepo, resourceRepo);
    return await getCargoWeight(contract.cargoId);
  };

  return getCargoWeightContract;
};

const makeGetAllResourcesContract = (cargoRepo, contractRepo, resourceRepo) => {
  const getAllResourcesContract = async (id) => {
    const contract = await contractRepo.getById(id);
    const getAllResourcesCargo = await makeGetAllResourcesCargo(cargoRepo, resourceRepo);
    return await getAllResourcesCargo(contract.cargoId);
  };

  return getAllResourcesContract;
};

const makeGetCargoWeightPilot = (cargoRepo, contractRepo, resourceRepo) => {
  const getCargoWeightPilot = async (pilotCertification) => {
    const contracts = await contractRepo.getByPilotCertification(
      pilotCertification
    );
    const getCargoWeightContract = await makeGetCargoWeightContract(cargoRepo, contractRepo, resourceRepo);
    let cargoWeightPilot = 0;
    for (let contract of contracts) {
      if (contract.isInProgress())
        cargoWeightPilot += await getCargoWeightContract(contract.id);
    }
    return cargoWeightPilot;
  };

  return getCargoWeightPilot;
};

const makeGetAllResourcesPilot = (cargoRepo, contractRepo, resourceRepo) => {
  const getAllResourcesPilot = async (pilotCertification) => {
    const contracts = await contractRepo.getByPilotCertification(
      pilotCertification
    );
    const getAllResourcesContract = await makeGetAllResourcesContract(cargoRepo, contractRepo, resourceRepo);
    let totalCargo = {
      water:0,
      food:0,
      minerals:0,
    };
    for (let contract of contracts) {
      if (contract.isInProgress()) {
        cargo = await getAllResourcesContract(contract.id);
        totalCargo.water += cargo.water; 
        totalCargo.food += cargo.food; 
        totalCargo.minerals += cargo.minerals; 
      }
    }
    return totalCargo;
  };

  return getAllResourcesPilot;
};

module.exports = {
  makeGetCargoWeight,
  makeGetCargoWeightContract,
  makeGetCargoWeightPilot,
  makeGetAllResourcesCargo,
  makeGetAllResourcesContract,
  makeGetAllResourcesPilot
};
