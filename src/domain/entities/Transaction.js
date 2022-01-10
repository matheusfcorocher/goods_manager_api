const { attributes } = require('structure');

const Transaction = attributes({
    id: Number,
    about: {
        type: String,
        required: true
    }
})(class Transaction {
    //methods
});

module.exports = Transaction;