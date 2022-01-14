const Transaction = require("../../../domain/entities/Transaction");

class RefillShip {
  constructor(shipsRepository, pilotsRepository, transactionsRepository) {
    this.shipsRepository = shipsRepository;
    this.pilotsRepository = pilotsRepository;
    this.transactionsRepository = transactionsRepository;
  }

  async _emitTransaction({name, credits}, actualCredits) {
    const about = `${name} bought fuel: +₭${credits - actualCredits}`;
    const transaction = new Transaction({ about: about });
    await this.transactionsRepository.add(transaction);
  }

  _refillShip({ credits }, { fuelCapacity, fuelLevel }) {
    let fuelRemaining = fuelCapacity - fuelLevel;
    if (fuelRemaining > 0) {
      let creditsInFuel = Math.round(credits / 7);
      credits = 0;
      let fuelRefilled = fuelRemaining - creditsInFuel;
      if (fuelRefilled < 0) {
        //when it left credits
        fuelLevel = fuelCapacity;
        credits = Math.round(fuelRefilled * -1 * 7);
        return { credits, fuelLevel };
      }
      fuelLevel += creditsInFuel;
    }
    return { credits, fuelLevel };
  };

  async execute(certification) {
    try {
      const pilot = await this.pilotsRepository.getByPilotCertification(
        certification
      );
      const ship = await this.shipsRepository.getByPilotCertification(
        certification
      );
      const { credits, fuelLevel } = this._refillShip(pilot, ship);
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
      throw error;
    }
  }
}

module.exports = RefillShip;
