class fakePilotRepository {
  constructor(Pilots) {
    this.pilots = Pilots;
  }

  async getById(id) {
    return await Promise.resolve(
      this.pilots.filter((pilot) => pilot.id === id)[0]
    );
  }

  async getByPilotCertification(certification) {
    const result = await Promise.resolve(
      this.pilots.filter(
        (pilot) => pilot.pilotCertification === certification
      )[0]
    );
    if (result === undefined) {
      const notFoundError = new Error("Not Found Error");
      notFoundError.CODE = "NOTFOUND_ERROR";
      notFoundError.message = `Pilot with pilotCertification ${certification} can't be found.`;
      throw notFoundError;
    }
    return result;
  }
}

module.exports = fakePilotRepository;