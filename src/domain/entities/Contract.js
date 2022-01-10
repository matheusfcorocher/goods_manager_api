const { attributes } = require('structure');

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
        type: String,
        required: true
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
});

module.exports = Contract;