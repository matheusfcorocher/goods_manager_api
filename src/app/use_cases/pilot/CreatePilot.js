const Operation = require('../../Operation');
const Pilot = require('../../../domain/entities/Pilot');

class CreatePilot extends Operation {
  constructor(pilotsRepository) {
    super();
    this.pilotsRepository = pilotsRepository;
  }

  async execute(pilotData) {
    const { SUCCESS, ERROR, VALIDATION_ERROR } = this.outputs;
    const pilot = new Pilot(pilotData);

    try {
      const newPilot = await this.pilotsRepository.add(pilot);

      this.emit(SUCCESS, newPilot);
    } catch(error) {
      console.log(error.message)
      if(error.message === 'Validation error') {
        return this.emit(VALIDATION_ERROR, error);
      }

      this.emit(ERROR, error);
    }
  }
}

CreatePilot.setOutputs(['SUCCESS', 'ERROR', 'VALIDATION_ERROR']);

module.exports = CreatePilot;