'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthService extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthServiceAvailment
      HealthService.hasMany(models.HealthServiceAvailment, {
        foreignKey: 'ServiceId',
        as: 'healthserviceavailment'
      });

    }
  }
  HealthService.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'HealthService',
    tableName: 'HealthServices',
    timestamps: true
  });
  return HealthService;
};