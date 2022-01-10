const { attributes } = require('structure');

const Pilot = attributes({
    id: Number,
    pilotCertification: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    locationPlanet: {
        type: String,
        required: true
    },
})(class Pilot {
    //methods
    isLegal() {
        return this.age >= Pilot.MIN_LEGAL_AGE;
    }
});

Pilot.MIN_LEGAL_AGE = 18;

module.exports = Pilot;