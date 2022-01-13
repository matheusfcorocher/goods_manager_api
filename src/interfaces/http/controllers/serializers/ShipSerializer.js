const ShipSerializer = {
    serialize({pilotCertification, fuelCapacity, fuelLevel, weightCapacity}) {
        return {
            pilotCertification: pilotCertification, 
            fuelCapacity: fuelCapacity, 
            fuelLevel: fuelLevel, 
            weightCapacity: weightCapacity, 
        };
    }
};

module.exports = ShipSerializer;