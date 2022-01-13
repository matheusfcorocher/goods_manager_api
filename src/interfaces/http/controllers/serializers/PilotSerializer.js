const PilotSerializer = {
    serialize({id, pilotCertification, name, age, credits, locationPlanet}) {
        return {
            id: id, 
            pilotCertification: pilotCertification, 
            name: name, 
            age: age, 
            credits: credits, 
            locationPlanet: locationPlanet
        };
    }
};

module.exports = PilotSerializer;