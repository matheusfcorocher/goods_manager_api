const { attributes } = require('structure');

const Cargo = attributes({
    id: Number,
    resourceIds: {
        type: Array,
        itemType: Number,
        required: true
    },
})(class Cargo {
    //methods
});

module.exports = Cargo;