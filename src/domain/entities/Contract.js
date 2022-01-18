const { attributes } = require('structure');
const { isValidPlanet } = require('./Planet');

const status = {
    CREATED: "CREATED",
    INPROGRESS: 'IN PROGRESS',
    FINISHED: 'FINISHED',
}

const Contract = attributes({
    id: Number,
    pilotCertification: Number,
    cargoId: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    originPlanet: {
        type: String,
        required: true
    },
    destinationPlanet: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    contractStatus: {
        type: String
    },
})(class Contract {
    //methods
    isCreated() {
        return this.contractStatus === status.CREATED;
    }
    isInProgress() {
        return this.contractStatus === status.INPROGRESS;
    }
    isFinished() {
        return this.contractStatus === status.FINISHED;
    }

    isValidContractPlanets() {
        return isValidPlanet(this.originPlanet) && isValidPlanet(this.destinationPlanet)
    }

    setStatusToCreated() {
        this.contractStatus = status.CREATED;
    }
});

module.exports = Contract;