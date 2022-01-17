class fakeShipRepository {
  constructor(Ships) {
    this.ships = Ships;
  }

  getById(id) {
    return Promise.resolve(
      this.ships.filter((ship) => ship.id === id)[0]
    );
  }

  getByPilotCertification(certification) {
    const result = this.ships.filter((ship) => ship.pilotCertification === certification)[0];
    if (result === undefined) {
      const notFoundError = new Error("Not Found Error");
      notFoundError.CODE = "NOTFOUND_ERROR";
      notFoundError.message = `Ship with shipCertification ${certification} can't be found.`;
      return Promise.reject(notFoundError);
    }
    return Promise.resolve(result);
  }
}

module.exports = fakeShipRepository;
