const db = require("../../../src/infra/database/models");

const DatabaseHandler = {
    cleanDatabase: () => {
        return db && db.sequelize.truncate({cascade: true, restartIdentity: true});
    },
    closeDatabase: async () => {
        return await db.sequelize.close();
    },
};

module.exports = { DatabaseHandler };

