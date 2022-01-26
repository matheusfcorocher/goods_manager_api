class fakeCargoRepository {
  constructor(Cargos) {
    this.cargos = Cargos;
  }

  getById(cargoId) {
    const result = this.cargos.filter((cargo) => cargo.id === cargoId)[0];
    if (result === undefined) {
      const notFoundError = new Error("Not Found Error");
      notFoundError.CODE = "NOTFOUND_ERROR";
      notFoundError.message = `Cargo with id ${cargoId} can't be found.`;
      return Promise.reject(notFoundError);
    }
    return Promise.resolve(result);
  }
}

module.exports = fakeCargoRepository;
