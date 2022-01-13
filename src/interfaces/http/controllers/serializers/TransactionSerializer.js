const TransactionSerializer = {
    serialize({id, about}) {
        return {
            id, 
            about 
        };
    },
};

module.exports = TransactionSerializer;