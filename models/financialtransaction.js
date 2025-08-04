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

      // Association with Revenue
      FinancialTransaction.belongsTo(models.Revenue, {
        foreignKey: 'RevenueId',
        as: 'Revenue'
      });

      // Association with Expenditure
      FinancialTransaction.belongsTo(models.Expenditure, {
        foreignKey: 'ExpenditureId',
        as: 'Expenditure'
      });
    }
  }
  FinancialTransaction.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'FinancialTransaction',
    tableName: 'FinancialTransactions',
    timestamps: true
  });
  return FinancialTransaction;
};