'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevenueSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RevenueSetting.init({
    RevenueId: DataTypes.INTEGER,
    Cost: DataTypes.FLOAT,
    Surcharge: DataTypes.INTEGER,
    Interest: DataTypes.INTEGER,
    Month: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RevenueSetting',
  });
  return RevenueSetting;
};