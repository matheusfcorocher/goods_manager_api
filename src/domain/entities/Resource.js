const { attributes } = require('structure');

const Resource = attributes({
    id: Number,
    name: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    }
})(class Resource {
    //methods
    verifyName() {
        return (
            this.name === "water" ||
            this.name === "food" ||
            this.name === "minerals"
        );
    }
    
    setName(name) {
        this.name = name;
    }
});

module.exports = Resource;