class fakeShipRepository {
  constructor(Ships) {
    this.ships = Ships;
  }

  async getById(id) {
    return await Promise.resolve(
      this.ships.filter((ship) => ship.id === id)[0]
    );
  }

  async getByPilotCertification(certification) {
    const result =  await Promise.resolve(
      this.ships.filter((ship) => ship.pilotCertification === certification)[0]
    );
    if (result === undefined) {
      const notFoundError = new Error("Not Found Error");
      notFoundError.CODE = "NOTFOUND_ERROR";
      notFoundError.message = `Ship with shipCertification ${certification} can't be found.`;
      throw notFoundError;
    }
    return result;
  }
}

module.exports = fakeShipRepository;