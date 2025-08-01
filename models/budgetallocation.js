'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BudgetAllocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BudgetAllocation.init({
    FiscalYear: DataTypes.INTEGER,
    AccountId: DataTypes.INTEGER,
    Amount: DataTypes.FLOAT,
    Notes: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'BudgetAllocation',
  });
  return BudgetAllocation;
};