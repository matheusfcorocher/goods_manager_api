const { attributes } = require('structure');

const Ship = attributes({
    id: Number,
    pilotCertification: {
        type: Number,
        required: true
    },
    fuelCapacity: {
        type: Number,
        required: true
    },
    fuelLevel: {
        type: Number,
        required: true
    },
    weightCapacity: {
        type: Number,
        required: true
    }
})(class Ship {
    //methods
    canCarry(weight) {
        return weight <= this.weightCapacity;
    }
});

module.exports = Ship;