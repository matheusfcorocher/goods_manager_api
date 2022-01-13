const getRefillShip = ({credits}, { fuelCapacity, fuelLevel }) => {
    let fuelRemaining = fuelCapacity - fuelLevel;
    if (fuelRemaining > 0) {
        let creditsInFuel = Math.round((credits) / 7);
        credits = 0;
        fuelRefilled = fuelRemaining - creditsInFuel;
        if (fuelRefilled < 0) {
            //when it left credits
            fuelLevel = fuelCapacity;
            credits = Math.round((fuelRefilled*-1*7));
            return {credits, fuelLevel};
        }
        fuelLevel += creditsInFuel;
    }
    return {credits, fuelLevel};
};

module.exports = {
    getRefillShip,
};
