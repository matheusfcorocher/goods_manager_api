class fakeCargoRepository {
  constructor(Cargos) {
    this.cargos = Cargos;
  }

  async getById(cargoId) {
    return await Promise.resolve(
      this.cargos.filter((cargo) => cargo.id === cargoId)[0]
    );
  }
}

module.exports = fakeCargoRepository;
