const models = require("../../src/infra/database/models/index.js");
const { Op } = require("sequelize");
const { compareValues } = require("../../helpers/index");
const { Contracts, Pilots, Cargos, Resources, Transactions } = models;

const getPlanetsReportHandler = async (req, reply) => {
  const contracts = await Contracts.findAll({
    where: {
      contractStatus: {
        [Op.ne]: "CREATED",
      },
    },
    include: [
      {
        model: Cargos,
        include: [
          {
            model: Resources,
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  });

  let planetsReport = {
    Aqua: {},
    Andvari: {},
    Calas: {},
    Demeter: {},
  };

  for (const item in planetsReport) {
    planetsReport[item] = {
      sent: {
        water: 0,
        food: 0,
        minerals: 0,
      },
      received: {
        water: 0,
        food: 0,
        minerals: 0,
      },
    };
  }

  contracts.forEach((contract) => {
    if (contract.contractStatus == "FINISHED") {
      planetsReport[contract.destinationPlanet] = {
        ...planetsReport[contract.destinationPlanet],
        received: {
          food:
            contract.Cargo.Resource.name == "food"
              ? contract.Cargo.Resource.weight
              : 0 + planetsReport[contract.destinationPlanet].received.food,
          water:
            contract.Cargo.Resource.name == "water"
              ? contract.Cargo.Resource.weight
              : 0 + planetsReport[contract.destinationPlanet].received.water,
          minerals:
            contract.Cargo.Resource.name == "minerals"
              ? contract.Cargo.Resource.weight
              : 0 + planetsReport[contract.destinationPlanet].received.minerals,
        },
      };
    }
    planetsReport[contract.originPlanet] = {
      ...planetsReport[contract.originPlanet],
      sent: {
        food:
          contract.Cargo.Resource.name == "food"
            ? contract.Cargo.Resource.weight
            : 0 + planetsReport[contract.originPlanet].sent.food,
        water:
          contract.Cargo.Resource.name == "water"
            ? contract.Cargo.Resource.weight
            : 0 + planetsReport[contract.originPlanet].sent.water,
        minerals:
          contract.Cargo.Resource.name == "minerals"
            ? contract.Cargo.Resource.weight
            : 0 + planetsReport[contract.originPlanet].sent.minerals,
      },
    };
  });
  
  reply.send(planetsReport);
};

const getPilotsReportHandler = async (req, reply) => {
  const pilots = await Pilots.findAll({
    include: [
      {
        model: Contracts,
        where: {
          contractStatus: "IN PROGRESS",
        },
        include: [
          {
            model: Cargos,
            include: [
              {
                model: Resources,
              },
            ],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  });

  let pilotReport = [];
  pilots.forEach((pilot) => {
    let report = {
      id: pilot.id,
      food:
        pilot.Contracts.Cargo.Resource.name == "food"
          ? pilot.Contracts.Cargo.Resource.weight
          : 0,
      water:
        pilot.Contracts.Cargo.Resource.name == "water"
          ? pilot.Contracts.Cargo.Resource.weight
          : 0,
      minerals:
        pilot.Contracts.Cargo.Resource.name == "minerals"
          ? pilot.Contracts.Cargo.Resource.weight
          : 0,
    };

    const isIdPresent = pilotReport.findIndex((o) => o.id === report.id);
    if (isIdPresent >= 0) {
      pilotReport[isIdPresent] = {
        id: pilot.id,
        food: pilotReport[isIdPresent].food + report.food,
        water: pilotReport[isIdPresent].water + report.water,
        minerals: pilotReport[isIdPresent].minerals + report.minerals,
      };
    } else {
      pilotReport.push(report);
    }
  });

  reply.send(pilotReport.sort(compareValues("id", "asc")));
};

const getTransactionsReportHandler = async (req, reply) => {
  const transactions = await Transactions.findAll();
  reply.send(transactions);
};

module.exports = {
  getPlanetsReportHandler,
  getPilotsReportHandler,
  getTransactionsReportHandler,
};
