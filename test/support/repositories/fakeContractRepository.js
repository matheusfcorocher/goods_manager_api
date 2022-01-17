const ContractSerializer = require("../../../src/interfaces/http/controllers/serializers/ContractSerializer");

class fakeContractRepository {
  constructor(Contracts) {
    this.contracts = Contracts;
  }

  async getById(id) {
    const result = await Promise.resolve(
      this.contracts.filter((contract) => contract.id === id)[0]
    );
    if (result === undefined) {
      const notFoundError = new Error("Not Found Error");
      notFoundError.CODE = "NOTFOUND_ERROR";
      notFoundError.message = `Contract with id ${id} can't be found.`;
      throw notFoundError;
    }
    return result;
  }

  async getByPilotCertification(certification) {
    return await Promise.resolve(
      this.contracts.filter(
        (contract) => contract.pilotCertification === certification
      )
    );
  }

  async update(id, data) {
    let result = await Promise.resolve(
      this.contracts.filter((contract) => contract.id === id)[0]
    );
    result = ContractSerializer.serialize(result);
    result = { ...result, ...data };
    return result;
  }
}

module.exports = fakeContractRepository;