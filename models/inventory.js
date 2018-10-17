module.exports = function(sequelize, DataTypes) {
  return sequelize.define("inventory", {
    product: DataTypes.STRING,
    price: DataTypes.STRING,
    quantity: DataTypes.STRING,
    description: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
