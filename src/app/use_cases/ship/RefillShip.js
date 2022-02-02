const Transaction = require("../../../domain/entities/Transaction");
const RefillShipDomainService = require("../../../domain/services/RefillShipDomainService");

class RefillShip {
  constructor(shipsRepository, pilotsRepository, transactionsRepository) {
    this.shipsRepository = shipsRepository;
    this.pilotsRepository = pilotsRepository;
    this.transactionsRepository = transactionsRepository;
  }

  async _emitTransaction({ name, credits }, actualCredits) {
    const about = `${name} bought fuel: +₭${credits - actualCredits}`;
    const transaction = new Transaction({ about: about });
    await this.transactionsRepository.add(transaction);
  }

  async execute(certification) {
    try {
      const pilot = await this.pilotsRepository.getByPilotCertification(
        certification
      );
      const ship = await this.shipsRepository.getByPilotCertification(
        certification
      );
      const { credits, fuelLevel } = RefillShipDomainService(pilot, ship);
      if (ship.fuelLevel != fuelLevel) {
        await this.pilotsRepository.update(certification, { credits: credits });
        await this.shipsRepository.update(certification, {
          fuelLevel: fuelLevel,
        });
        await this._emitTransaction(pilot, credits);
        return "The fuel of the ship was refilled!";
      }
      const validationError = new Error("Validation Error");
      validationError.CODE = "VALIDATION_ERROR";
      validationError.errors = "The fuel capacity of the ship is full!";
      throw validationError;
    } catch (error) {
      if(!error.CODE) {
        const internalError = new Error("Internal Error");
        internalError.CODE = "INTERNAL_ERROR";
        internalError.message = "Internal Error";
        internalError.details = error.original.detail;
        throw internalError;
      }
      throw error;
    }
  }
}

module.exports = RefillShip;
