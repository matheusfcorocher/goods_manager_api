class FakeRepositoriesFactory {
    constructor() {
        if(this.constructor == FakeRepositoriesFactory) {
            throw new Error("Abstract classes can't be instantiated.")
        }
    }

    createFakeRepository() {
        throw new Error("Method 'createFakeRepository()' must be implemented.");
    }
    

}

class fakeCargoRepository {
    constructor(Cargos) {
        this.cargos = Cargos;
    }

    async getById(cargoId) {
        return await Promise.resolve(this.cargos.filter(cargo => cargo.id === cargoId)[0]);
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

class fakePilotRepository {
    constructor(Pilots) {
        this.pilots = Pilots;
    }

    async getById(id) {
        return await Promise.resolve(this.pilots.filter(pilot => pilot.id === id)[0]);
    }

    async getByPilotCertification(certification) {
        return await Promise.resolve(this.pilots.filter(pilot => pilot.pilotCertification === certification));
    }
}

class fakeShipRepository {
    constructor(Ships) {
        this.ships = Ships;
    }

    async getById(id) {
        return await Promise.resolve(this.ships.filter(ship => ship.id === id)[0]);
    }

    async getByPilotCertification(certification) {
        return await Promise.resolve(this.ships.filter(ship => ship.pilotCertification === certification));
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
module.exports = {fakeCargoRepository, fakeContractRepository, fakePilotRepository, fakeShipRepository, fakeResourceRepository};