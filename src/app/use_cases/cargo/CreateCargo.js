const Operation = require('../../Operation');
const Cargo = require('../../../domain/entities/Cargo');

class CreateCargo extends Operation {
  constructor(cargosRepository) {
    super();
    this.cargosRepository = cargosRepository;
  }

  async execute(cargoData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const cargo = new Cargo(cargoData);

    try {
      const newCargo = await this.cargosRepository.add(cargo);

      this.emit(SUCCESS, newCargo);
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Validation error') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreateCargo.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreateCargo;