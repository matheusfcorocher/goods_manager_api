const Transaction = require("../../../domain/entities/Transaction");
const Operation = require("../../Operation");
const { getRefillShip } = require("../../ship");

class RefillShip extends Operation {
  constructor(shipsRepository, pilotsRepository, transactionsRepository) {
    super();
    this.shipsRepository = shipsRepository;
    this.pilotsRepository = pilotsRepository;
    this.transactionsRepository = transactionsRepository;
  }

  _refillShip = ({credits}, { fuelCapacity, fuelLevel }) => {
    let fuelRemaining = fuelCapacity - fuelLevel;
    if (fuelRemaining > 0) {
        let creditsInFuel = Math.round((credits) / 7);
        credits = 0;
        fuelRefilled = fuelRemaining - creditsInFuel;
        if (fuelRefilled < 0) {
            //when it left credits
            fuelLevel = fuelCapacity;
            credits = Math.round((fuelRefilled*-1*7));
            return {credits, fuelLevel};
        }
        fuelLevel += creditsInFuel;
    }
    return {credits, fuelLevel};
  };

  async execute(certification) {
    const { SUCCESS, NOT_FOUND, VALIDATION_ERROR, ERROR } = this.outputs;

    try {
      const pilot = await this.pilotsRepository.getByPilotCertification(
        certification
      );
      const ship = await this.shipsRepository.getByPilotCertification(
        certification
      );
      const {credits, fuelLevel} = this._refillShip(pilot, ship)
      if(ship.fuelLevel != fuelLevel) {
        await this.pilotsRepository.update(
          certification,
          {credits: credits}
        );
        await this.shipsRepository.update(
          certification,
          {fuelLevel: fuelLevel}
        );
        const about = `${pilot.name} bought fuel: +₭${pilot.credits - credits}`
        const transaction = new Transaction({about: about});
        await this.transactionsRepository.add(transaction);
        this.emit(SUCCESS, 'The fuel of the ship was refilled!');
      }
      this.emit(SUCCESS, 'The fuel capacity of the ship is full!');
    } catch (error) {
      switch (error.message) {
        case "ValidationError":
          return this.emit(VALIDATION_ERROR, error);
        case "NotFoundError":
          return this.emit(NOT_FOUND, error);
        default:
          this.emit(ERROR, error);
      }
    }
  }
}

RefillShip.setOutputs(["SUCCESS", "NOT_FOUND", "VALIDATION_ERROR", "ERROR"]);

module.exports = RefillShip;
