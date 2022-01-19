const Ship = require("../../../src/domain/entities/Ship");
const ShipSerializer = require("../../../src/interfaces/http/controllers/serializers/ShipSerializer");

class fakeShipRepository {
  constructor(Ships) {
    this.ships = Ships;
  }

  add(ship) {
    ship.id = this.ships.length + 1;
    this.ships.push(ship);
    return Promise.resolve(ship);
  }

  getById(id) {
    let result = this.ships.filter((ship) => ship.id === id)[0]
    return Promise.resolve(result);
  }

  getByPilotCertification(certification) {
    const result = this.ships.filter((ship) => ship.pilotCertification === certification)[0];
    if (result === undefined) {
      const notFoundError = new Error("Not Found Error");
      notFoundError.CODE = "NOTFOUND_ERROR";
      notFoundError.message = `Ship with pilotCertification ${certification} can't be found.`;
      return Promise.reject(notFoundError);
    }
    return Promise.resolve(result);
  }
  
  hasShip(certification) {
    const result = this.ships.filter((ship) => ship.pilotCertification === certification)[0];
    if (result === undefined) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  }

  update(certification, data) {
    let result = this.ships.filter((ship) => ship.pilotCertification === certification)[0];
    result = ShipSerializer.serialize(result);
    result = new Ship({ ...result, ...data });
    let index = this.ships.findIndex((i) => i.pilotCertification === certification)
    this.ships.splice(index, 1, result)
    return Promise.resolve(result);
  }
}

module.exports = fakeShipRepository;
