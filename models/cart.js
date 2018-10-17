module.exports = function(sequelize, DataTypes) {
  return sequelize.define("cart", {
    product: DataTypes.STRING,
    quantity: DataTypes.STRING,
    price: DataTypes.STRING,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  });
};
