const Transaction = require('../../../domain/entities/Transaction');

const SequelizeTransactionMapper = {
    toEntity(dataValues) {
        const {id, about} = dataValues;
        return new Transaction({id, about});
    },
    toDatabase(transaction) {
        const { id, about } = transaction;
        return { id, about };
    }
}

module.exports = SequelizeTransactionMapper;