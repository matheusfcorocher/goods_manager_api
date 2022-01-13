const Ship = require('../../../domain/entities/Ship');

const SequelizeShipMapper = {
    toEntity(dataValues) {
        const {id, pilotCertification, fuelCapacity, fuelLevel, weightCapacity} = dataValues;
        return new Ship({id, pilotCertification, fuelCapacity, fuelLevel, weightCapacity});
    },
    toDatabase(pilot) {
        const { pilotCertification, fuelCapacity, fuelLevel, weightCapacity } = pilot;
        return { pilotCertification, fuelCapacity, fuelLevel, weightCapacity };
    }
}

module.exports = SequelizeShipMapper;