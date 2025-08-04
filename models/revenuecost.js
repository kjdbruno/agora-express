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

      // Association with RevenueItem
       RevenueCost.belongsTo(models.RevenueItem, {
        foreignKey: 'RevenueId',
        as: 'RevenueItem'
      });
      
    }
  }
  RevenueCost.init({
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
    Cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Surcharge: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Interest: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Month: {
      type: DataTypes.ENUM('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'RevenueCost',
    tableName: 'RevenueCosts',
    timestamps: true
  });
  return RevenueCost;
};