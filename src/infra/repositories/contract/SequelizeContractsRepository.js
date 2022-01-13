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
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error('Not Found Error');
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Contract with id ${id} can't be found.`;
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
        return [];
        // const notFoundError = new Error("NotFoundError");
        // notFoundError.details = `Contract with pilotCertification ${certification} can't be found.`;

        // throw notFoundError;
      }

      throw error;
    }
  }

  //Public
  async add(contract) {
    const { valid, errors } = contract.validate();
    if(!valid) {
      const validationError = new Error('Validation error');
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = errors;
      throw validationError;
    }
    
    await this.ContractModel.create(ContractMapper.toDatabase(contract));
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

  async update(id, newData) {
    const contract = await this._getById(id);
    
    const transaction = await this.ContractModel.sequelize.transaction();

    try {
      const updatedContract = await contract.update(newData, { transaction: transaction });
      
      const contractEntity = ContractMapper.toEntity(updatedContract);

      const { valid, errors } = contractEntity.validate();

      if(!valid) {
        const error = new Error('ValidationError');
        error.errors = errors;
        throw error;
      }

      await transaction.commit();
      return contractEntity;
    } catch(error) {
      await transaction.rollback();

      throw error;
    }
  }

  async getAll(contractStatus) {
    const contracts = await this.ContractModel.findAll();
    if(contractStatus)
      return contracts.map(ContractMapper.toEntity).filter((c) => c.contractStatus === contractStatus);
    return contracts.map(ContractMapper.toEntity);
  }
}


module.exports = SequelizeContractsRepository;
