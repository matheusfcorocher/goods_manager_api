const { compareValues } = require("../../helpers/index.js");
const models = require("../../models/index.js");
const { Contracts, Pilots, Cargos, Resources, Transactions } = models;

const isPossibleToShipCarry = (
  shipCapacity,
  actualShipWeight,
  totalContractWeight
) => {
  if (totalContractWeight + actualShipWeight <= shipCapacity) return true;
  return false;
};

const WeightPilotIsCarrying = async (id) => {
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

  let pilotsWeights = pilotReport.sort(compareValues("id", "asc"));

  let pilotWeight = pilotsWeights.filter((pilot) => pilot.id === id);
  
  let actualShipWeight = 0;
  
  if(pilotWeight.length > 0) {
      delete pilotWeight[0].id;
      
      for (const weight in pilotWeight[0]) {
        actualShipWeight += pilotWeight[0][weight];
      }
  }

  console.log(actualShipWeight);
  
  return actualShipWeight;
};

module.exports = { isPossibleToShipCarry, WeightPilotIsCarrying };
