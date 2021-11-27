const { compareValues } = require("../../helpers/index.js");
const models = require("../../models/index.js");
const { Contracts, Pilots, Cargos, Resources, Transactions } = models;

const verifyResourceName = (resourceName) => {
  if (
    resourceName === "water" &&
    resourceName === "food" &&
    resourceName === "minerals"
  )
    return true;
  return false;
};

const WeightContract = async (id) => {
  const contracts = await Contracts.findAll({
    where: {
      id: id,
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
  let contractReport = [];
  contracts.forEach((contract) => {
    let report = {
      id: contract.id,
      food:
        contract.Cargo.Resource.name == "food"
          ? contract.Cargo.Resource.weight
          : 0,
      water:
        contract.Cargo.Resource.name == "water"
          ? contract.Cargo.Resource.weight
          : 0,
      minerals:
        contract.Cargo.Resource.name == "minerals"
          ? contract.Cargo.Resource.weight
          : 0,
    };
    
    const isIdPresent = contractReport.findIndex((o) => o.id === report.id);
    if (isIdPresent >= 0) {
        contractReport[isIdPresent] = {
        id: contract.id,
        food: contractReport[isIdPresent].food + report.food,
        water: contractReport[isIdPresent].water + report.water,
        minerals: contractReport[isIdPresent].minerals + report.minerals,
      };
    } else {
        contractReport.push(report);
    }
  });
  delete contractReport[0].id;

  let totalContractWeight = 0;

  for (const weight in contractReport[0]) {
    totalContractWeight += contractReport[0][weight];
  }

  return totalContractWeight;
};

module.exports = { verifyResourceName, WeightContract };
