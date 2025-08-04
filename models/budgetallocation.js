'use strict';
const {
  Model
} = require('sequelize');
const { AccountChart } = require('.');
module.exports = (sequelize, DataTypes) => {
  class BudgetAllocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with AccountChart
      BudgetAllocation.belongsTo(models.AccountChart, {
        foreignKey: 'AccountId',
        as: 'Account'
      });
    }
  }
  BudgetAllocation.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    FiscalYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AccountCharts',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Notes: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'BudgetAllocation',
    tableName: 'BudgetAllocations',
    timestamps: true
  });
  return BudgetAllocation;
};