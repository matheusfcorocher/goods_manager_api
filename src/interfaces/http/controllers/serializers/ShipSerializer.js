const ShipSerializer = {
    serialize({id, pilotCertification, fuelCapacity, fuelLevel, weightCapacity}) {
        return {
            id: id,
            pilotCertification: pilotCertification, 
            fuelCapacity: fuelCapacity, 
            fuelLevel: fuelLevel, 
            weightCapacity: weightCapacity, 
        };
    }
};

module.exports = ShipSerializer;