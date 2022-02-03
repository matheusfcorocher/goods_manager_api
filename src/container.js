const models = require("../src/infra/database/models/index.js");

const SequelizeCargosRepository = require("../src/infra/repositories/cargo/SequelizeCargosRepository.js");
const SequelizeContractsRepository = require("../src/infra/repositories/contract/SequelizeContractsRepository.js");
const SequelizePilotsRepository = require("../src/infra/repositories/pilot/SequelizePilotsRepository.js");
const SequelizeResourcesRepository = require("../src/infra/repositories/resource/SequelizeResourcesRepository.js");
const SequelizeShipsRepository = require("../src/infra/repositories/ship/SequelizeShipsRepository.js");
const SequelizeTransactionsRepository = require("../src/infra/repositories/transaction/SequelizeTransactionsRepository.js");

const { GetAllContracts, AcceptContract, FulfillContract, PublishContract} = require("./app/use_cases/contract/index.js");
const { CreatePilot, TravelPilot } = require("./app/use_cases/pilot/index.js");
const { GetPlanetsReport, GetPilotsReport, GetTransactionsReport} = require("./app/use_cases/reports/index.js");
const { CreateShip, RefillShip } = require("./app/use_cases/ship/index.js");

const cargoModel = models.Cargos;
const contractModel = models.Contracts;
const pilotModel = models.Pilots;
const shipModel = models.Ships;
const resourceModel = models.Resources;
const transactionModel = models.Transactions;

const cargoRepo = new SequelizeCargosRepository(cargoModel);
const contractRepo = new SequelizeContractsRepository(contractModel);
const pilotRepo = new SequelizePilotsRepository(pilotModel);
const shipRepo = new SequelizeShipsRepository(shipModel);
const resourceRepo = new SequelizeResourcesRepository(resourceModel);
const transactionRepo = new SequelizeTransactionsRepository(transactionModel);

//Contract UseCases
const acceptContract = new AcceptContract({
  cargosRepository: cargoRepo,
  contractsRepository: contractRepo,
  pilotsRepository: pilotRepo,
  shipsRepository: shipRepo,
  resourcesRepository: resourceRepo,
});

const fulfillContract = new FulfillContract({
  contractsRepository: contractRepo,
  pilotsRepository: pilotRepo,
  transactionsRepository: transactionRepo,
});

const getAllContracts = new GetAllContracts(contractRepo);
const publishContract = new PublishContract(contractRepo, cargoRepo);

//Pilots Use Cases
const createPilot = new CreatePilot(pilotRepo);
const travelPilot = new TravelPilot(pilotRepo, shipRepo);

//Reports Use Cases
const getPlanetsReport = new GetPlanetsReport(
  cargoRepo,
  contractRepo,
  resourceRepo
);
const getPilotsReport = new GetPilotsReport(
  cargoRepo,
  contractRepo,
  pilotRepo,
  resourceRepo
);
const getTransactionsReport = new GetTransactionsReport(transactionRepo);
//Ships Use Cases
const createShip = new CreateShip(shipRepo, pilotRepo);
const refillShip = new RefillShip(shipRepo, pilotRepo, transactionRepo);

const Container = {
    contracts: {
        acceptContract,
        fulfillContract,
        getAllContracts,
        publishContract
    },
    pilots: {
        createPilot,
        travelPilot
    },
    reports: {
        getPlanetsReport,
        getPilotsReport,
        getTransactionsReport
    },
    ships: {
        createShip,
        refillShip
    },
}


module.exports = {
  Container
};
