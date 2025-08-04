'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenditure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with AccountChart
      Expenditure.belongsTo(models.AccountChart, {
        foreignKey: 'AccountId',
        as: 'Account'
      });

      // Association with FinancialTransaction
      Expenditure.hasMany(models.FinancialTransaction, {
        foreignKey: 'TransactionId',
        as: 'Transaction'
      });
    }
  }
  Expenditure.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    AccountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'AccountCharts',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    TransactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FinancialTransactions',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    Payee: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    DVNo: {
      type: DataTypes.STRING,
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
    modelName: 'Expenditure',
    tableName: 'Expenditures',
    timestamps: true
  });
  return Expenditure;
};