const isPossibleToShipCarry = (shipWeight, TotalCargoWeight) => {
    if(shipWeight >= TotalCargoWeight)
        return true;
    return false;
}

module.exports = { isPossibleToShipCarry};