'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RevenueItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Associatyion with Revenue
      RevenueItem.hasMany(models.Revenue, {
        foreignKey: 'RevenueId',
        as: 'Revenues'
      });

      // Association with RevenueCost
      RevenueItem.hasMany(models.RevenueCost, {
        foreignKey: 'RevenueId',
        as: 'Costs'
      });

      // Association with RevenueSetting
      RevenueItem.hasOne(models.RevenueSetting, {
        foreignKey: 'RevenueId',
        as: 'Setting'
      });
    }
  }
  RevenueItem.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'RevenueItem',
    tableName: 'RevenueItems',
    timestamps: true
  });
  return RevenueItem;
};