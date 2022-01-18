const ContractSerializer = require("../../../src/interfaces/http/controllers/serializers/ContractSerializer");

class fakeContractRepository {
  constructor(Contracts) {
    this.contracts = Contracts;
  }

  add(contract) {
    contract.id = this.contracts.length + 1;
    if (contract.isValidContractPlanets())
      return Promise.resolve(this.contracts.push(contract));

    const validationError = new Error("Validation Error");
    validationError.CODE = "VALIDATION_ERROR";
    validationError.errors = "The origin planet or destination planet is invalid.";
    return Promise.reject(validationError);
  }

  getAll(contractStatus) {
    let contracts = this.contracts;
    if (contractStatus)
      contracts = contracts.filter((c) => c.contractStatus === contractStatus);
    return Promise.resolve(contracts);
  }

  getById(id) {
    const result = this.contracts.filter((contract) => contract.id === id)[0];
    if (result === undefined) {
      const notFoundError = new Error("Not Found Error");
      notFoundError.CODE = "NOTFOUND_ERROR";
      notFoundError.message = `Contract with id ${id} can't be found.`;
      return Promise.reject(notFoundError);
    }
    return Promise.resolve(result);
  }

  getByPilotCertification(certification) {
    return Promise.resolve(
      this.contracts.filter(
        (contract) => contract.pilotCertification === certification
      )
    );
  }

  update(id, data) {
    let result = this.contracts.filter((contract) => contract.id === id)[0];
    result = ContractSerializer.serialize(result);
    result = { ...result, ...data };
    let index = this.contracts.findIndex((i) => i.id === id);
    this.contracts.splice(index, 1, result);
    return Promise.resolve(result);
  }
}

module.exports = fakeContractRepository;
