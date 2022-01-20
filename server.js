//server.js
const app = require("./app");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
      await app.listen(PORT);
    } catch (err) {
      app.log.error(err);
      sequelize.close();
      process.exit(1);
    }
  };
  
  startServer();
  