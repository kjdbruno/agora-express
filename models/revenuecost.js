'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevenueCost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RevenueCost.init({
    RevenueId: DataTypes.INTEGER,
    Cost: DataTypes.FLOAT,
    Surcharge: DataTypes.FLOAT,
    Interest: DataTypes.FLOAT,
    Month: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RevenueCost',
  });
  return RevenueCost;
};