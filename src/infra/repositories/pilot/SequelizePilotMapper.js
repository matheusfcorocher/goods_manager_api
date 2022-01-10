const Pilot = require('../../../domain/entities/Pilot');

const SequelizePilotMapper = {
    toEntity(dataValues) {
        const {id, pilotCertification, age, credits, locationPlanet} = dataValues;
        return new Pilot({id, pilotCertification, age, credits, locationPlanet});
    }
}

module.exports = SequelizePilotMapper;