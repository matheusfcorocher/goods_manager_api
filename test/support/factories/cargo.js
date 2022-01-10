class fakeCargoRepository {
    constructor(Cargos) {
        this.cargos = Cargos;
    }

    async getById(cargoId) {
        return await Promise.resolve(this.cargos.filter(cargo => cargo.id === cargoId)[0]);
    }
}

class fakeResourceRepository {
    constructor(Resources) {
        this.resources = Resources;
    }

    async getById(id) {
        return await Promise.resolve(this.resources.filter(resource => resource.id === id)[0]);
    }
}

class fakeContractRepository {
    constructor(Contracts) {
        this.contracts = Contracts;
    }

    async getById(id) {
        return await Promise.resolve(this.contracts.filter(contract => contract.id === id)[0]);
    }

    async getByPilotCertification(certification) {
        return await Promise.resolve(this.contracts.filter(contract => contract.pilotCertification === certification));
    }
}

module.exports = {fakeCargoRepository, fakeResourceRepository, fakeContractRepository};