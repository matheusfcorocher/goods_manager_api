class fakePilotRepository {
  constructor(Pilots) {
    this.pilots = Pilots;
  }

  getById(id) {
    return Promise.resolve(this.pilots.filter((pilot) => pilot.id === id)[0]);
  }

  getByPilotCertification(certification) {
    const result = this.pilots.filter(
      (pilot) => pilot.pilotCertification === certification
    )[0];
    if (result === undefined) {
      const notFoundError = new Error("Not Found Error");
      notFoundError.CODE = "NOTFOUND_ERROR";
      notFoundError.message = `Pilot with pilotCertification ${certification} can't be found.`;
      return Promise.reject(notFoundError);
    }
    return Promise.resolve(result);
  }
}

module.exports = fakePilotRepository;
