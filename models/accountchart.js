'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AccountChart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with BudgetAllocation
      AccountChart.hasMany(models.BudgetAllocation, {
        foreignKey: 'AccountId',
        as: 'BudgetAllocations'
      });

      // Association with Expenditure
      AccountChart.hasMany(models.Expenditure, {
        foreignKey: 'AccountId',
        as: 'Expenditures'
      });
      
    }
  }
  AccountChart.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    AccountType: {
      type: DataTypes.ENUM('Asset', 'Liability', 'Equity', 'Revenue', 'Expense'),
      allowNull: false
    },
    Type: {
      type: DataTypes.ENUM('Debit', 'Credit'),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'AccountChart',
    tableName: 'AccountCharts',
    timestamps: true
  });
  return AccountChart;
};