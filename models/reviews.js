module.exports = function(sequelize, DataTypes) {
  return sequelize.define("review", {
    email: DataTypes.STRING,
    comment: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
