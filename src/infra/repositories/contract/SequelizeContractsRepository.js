const ContractMapper = require("./SequelizeContractMapper");

class SequelizeContractsRepository {
  constructor(ContractModel) {
    this.ContractModel = ContractModel;
  }

  // Private

  async _getById(id) {
    try {
      return await this.ContractModel.findOne({
        where: { id: id },
        raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `Contract with id ${id} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }
  
  async _getByPilotCertification(certification) {
    try {
      return await this.ContractModel.findAll({
        where: {
          pilotCertification: certification,
        },
        raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("NotFoundError");
        notFoundError.details = `Contract with pilotCertification ${certification} can't be found.`;

        throw notFoundError;
      }

      throw error;
    }
  }

  async getById(id) {
    const contract = await this._getById(id);
    return ContractMapper.toEntity(contract);
  }

  async getByPilotCertification(certification) {
    const contracts = await this._getByPilotCertification(certification);
    let contractsEntities = [];
    for (let contract of contracts) {
      contractsEntities.push(ContractMapper.toEntity(contract));
    }
    return contractsEntities;
  }
}


module.exports = SequelizeContractsRepository;
