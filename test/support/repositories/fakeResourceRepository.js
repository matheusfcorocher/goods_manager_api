class fakeResourceRepository {
  constructor(Resources) {
    this.resources = Resources;
  }

  getById(id) {
    return Promise.resolve(
      this.resources.filter((resource) => resource.id === id)[0]
    );
  }
}

module.exports = fakeResourceRepository;