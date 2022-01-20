const db = require("../../../src/infra/database/models");

const DatabaseHandler = {
    cleanDatabase: async () => {
        return await db && db.sequelize.truncate({cascade: true});
    },
    closeDatabase: async () => {
        return await db.sequelize.close();
    },
};

module.exports = { DatabaseHandler };

