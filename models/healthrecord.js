'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthServiceAvailment
      HealthRecord.belongsTo(models.HealthServiceAvailment, {
        foreignKey: 'ServiceAvailmentId',
        as: 'healthserviceavailment'
      });

    }
  }
  HealthRecord.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    ServiceAvailmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthServiceAvailments',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    BMI: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    BloodPressure: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Temperature: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    PulseRate: {
      type: DataTypes.FLOAT,
      allowNull: true
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
    modelName: 'HealthRecord',
    tableName: 'HealthRecords',
    timestamps: true
  });
  return HealthRecord;
};