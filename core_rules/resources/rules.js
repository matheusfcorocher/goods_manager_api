const verifyResourceName = (resourceName) => {
    if(resourceName === "water" && resourceName === "food" && resourceName === "minerals")
        return true;
    return false;
}

module.exports = { verifyResourceName };