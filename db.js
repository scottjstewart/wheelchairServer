const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "ezrent",
  "postgres",
  "#A66788765@s!c0tt",
  {
    host: "localhost",
    dialect: "postgres"
  }
);

sequelize.authenticate().then(
  function() {
    console.log("Connected to ezrent postgres database");
  },
  function(err) {
    console.log(err);
  }
);

module.exports = sequelize;