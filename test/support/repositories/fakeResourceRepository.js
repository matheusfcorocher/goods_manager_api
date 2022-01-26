class fakeResourceRepository {
  constructor(Resources) {
    this.resources = Resources;
  }

  getById(id) {
    const result = this.resources.filter((resource) => resource.id === id)[0];
    if (result === undefined) {
      const notFoundError = new Error("Not Found Error");
      notFoundError.CODE = "NOTFOUND_ERROR";
      notFoundError.message = `Resource with id ${id} can't be found.`;
      return Promise.reject(notFoundError);
    }
    return Promise.resolve(result);
  }
}

module.exports = fakeResourceRepository;