const Planets = {
    ANDVARI: "Andvari",
    AQUA: "Aqua",
    CALAS: "Calas",
    DEMETER: "Demeter", 
} 

const isValidPlanet = (name) => {
    return Planets[name.toUpperCase()] !== undefined
}

module.exports = {Planets, isValidPlanet};