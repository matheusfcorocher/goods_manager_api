const verifyResourceName = (resourceName) => {
  return (
    resourceName === "water" ||
    resourceName === "food" ||
    resourceName === "minerals"
  );
};

const WeightContract =  (contracts) => {
  
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
  
  let totalContractWeight = -1;
  
  if(contractReport.length > 0) {
    totalContractWeight += 1;
    delete contractReport[0].id;
  
    for (const weight in contractReport[0]) {
      totalContractWeight += contractReport[0][weight];
    }
  }

  return totalContractWeight;
};

module.exports = { verifyResourceName, WeightContract };
