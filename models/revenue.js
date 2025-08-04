'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Revenue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with RevenueItem
      Revenue.belongsTo(models.RevenueItem, {
        foreignKey: 'RevenueId',
        as: 'RevenueItem'
      });

      // Assocition with Resident
      Revenue.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'Resident'
      });

      // Association with FinancialTransaction
      Revenue.belongsTo(models.FinancialTransaction, {
        foreignKey: 'TransactionId',
        as: 'Transaction'
      });
    }
  }
  Revenue.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    RevenueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'RevenueItems',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    ResidentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Residents',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    TransactionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'FinancialTransactions',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    ReceiptNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Notes: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    IsVoid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Revenue',
    tableName: 'Revenues',
    timestamps: true
  });
  return Revenue;
};