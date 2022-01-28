const Transaction = require('../../../domain/entities/Transaction');

const SequelizeTransactionMapper = {
    toEntity(dataValues) {
        const {id, about} = dataValues;
        return new Transaction({id, about});
    },
    toDatabase(transaction) {
        const { about } = transaction;
        return { about };
    }
}

module.exports = SequelizeTransactionMapper;