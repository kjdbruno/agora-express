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

      // Association with RevenueItem
      RevenueSetting.belongsTo(models.RevenueItem, {
        foreignKey: 'RevenueId',
        as: 'RevenueItem'
      });
    }
  }
  RevenueSetting.init({
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
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'RevenueSetting',
    tableName: 'RevenueSettings',
    timestamps: true
  });
  return RevenueSetting;
};