const PilotSerializer = require("../../../src/interfaces/http/controllers/serializers/PilotSerializer");

class fakePilotRepository {
  constructor(Pilots) {
    this.pilots = Pilots;
  }

  add(pilot) {
    pilot.id = this.pilots.length + 1;
    this.pilots.push(pilot);
    return Promise.resolve(pilot);
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

  update(certification, data) {
    let result = this.pilots.filter((pilot) => pilot.pilotCertification === certification)[0];
    result = PilotSerializer.serialize(result);
    result = { ...result, ...data };
    let index = this.pilots.findIndex((i) => i.pilotCertification === certification)
    this.pilots.splice(index, 1, result)
    return Promise.resolve(result);
  }
}

module.exports = fakePilotRepository;
