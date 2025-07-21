'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlotterHandler extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Blotter
      BlotterHandler.belongsTo(models.Blotter, {
        foreignKey: 'BlotterId',
        as: 'blotter'
      });

      // Association with OfficialSettings
      BlotterHandler.belongsTo(models.OfficialSetting, {
        foreignKey: 'OfficialId',
        as: 'official'
      });

    }
  }
  BlotterHandler.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    BlotterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Blotters',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    OfficialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'OfficialSettings',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Role: {
      type: DataTypes.ENUM('Presiding Officer', 'Investigator', 'Mediator', 'Arbitrator'),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'BlotterHandler',
    tableName: 'BlotterHandlers',
    timestamps: true,
  });
  return BlotterHandler;
};