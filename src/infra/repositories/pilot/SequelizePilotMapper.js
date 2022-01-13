const Pilot = require('../../../domain/entities/Pilot');

const SequelizePilotMapper = {
    toEntity(dataValues) {
        const {id, pilotCertification, name, age, credits, locationPlanet} = dataValues;
        return new Pilot({id, name, pilotCertification, age, credits, locationPlanet});
    },
    toDatabase(pilot) {
        const { pilotCertification, name, age, credits, locationPlanet } = pilot;
        return { pilotCertification, name, age, credits, locationPlanet };
    }
}

module.exports = SequelizePilotMapper;