const ResourceMapper = require("./SequelizeResourceMapper");

class SequelizeResourcesRepository {
  constructor(ResourceModel) {
    this.ResourceModel = ResourceModel;
  }

  // Private

  async _getById(id) {
    try {
      return await this.ResourceModel.findOne({
        where: { id: id },
        raw: true,
        rejectOnEmpty: true,
      });
    } catch (error) {
      if (error.name === "SequelizeEmptyResultError") {
        const notFoundError = new Error("Not Found Error");
        notFoundError.CODE = "NOTFOUND_ERROR";
        notFoundError.message = `Resource with id ${id} can't be found.`;
        throw notFoundError;
      }

      throw error;
    }
  }

  async getById(id) {
    const resource = await this._getById(id);
    return ResourceMapper.toEntity(resource);
  }
}

module.exports = SequelizeResourcesRepository;
