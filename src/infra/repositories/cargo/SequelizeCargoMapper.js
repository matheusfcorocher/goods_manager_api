const Cargo = require("../../../domain/entities/Cargo");

const SequelizeCargoMapper = {
  toEntity(cargos) {
    let resourceIds = [];
    for (let cargo of cargos) {
      resourceIds.push(cargo.resourceId);
    }
    let {cargoId} = cargos[0];
    return new Cargo({ id: cargoId, resourceIds });
  },
};

module.exports = SequelizeCargoMapper;
