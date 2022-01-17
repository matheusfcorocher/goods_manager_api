class fakeResourceRepository {
  constructor(Resources) {
    this.resources = Resources;
  }

  async getById(id) {
    return await Promise.resolve(
      this.resources.filter((resource) => resource.id === id)[0]
    );
  }
}

module.exports = fakeResourceRepository;