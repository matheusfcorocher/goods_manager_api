class fakeCargoRepository {
  constructor(Cargos) {
    this.cargos = Cargos;
  }

  getById(cargoId) {
    return Promise.resolve(
      this.cargos.filter((cargo) => cargo.id === cargoId)[0]
    );
  }
}

module.exports = fakeCargoRepository;
