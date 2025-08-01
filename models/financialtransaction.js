'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FinancialTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FinancialTransaction.init({
    Date: DataTypes.DATE,
    Amount: DataTypes.FLOAT,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'FinancialTransaction',
  });
  return FinancialTransaction;
};