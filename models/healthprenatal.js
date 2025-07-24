'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthPrenatal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthMaternalRecord
      HealthPrenatal.belongsTo(models.HealthMaternalRecord, {
        foreignKey: 'MaternalRecordId',
        as: 'healthmaternalrecord'
      });

    }
  }
  HealthPrenatal.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    MaternalRecordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthMaternalRecords',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Purpose: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'HealthPrenatal',
    tableName: 'HealthPrenatals',
    timestamps: true
  });
  return HealthPrenatal;
};  