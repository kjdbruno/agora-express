'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthPrenatalMedication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthPrenatalCheckup
      HealthPrenatalMedication.belongsTo(models.HealthPrenatalCheckup, {
        foreignKey: 'HealthPrenatalCheckupId',
        as: 'healthprenatalmedication'
      });

      // Association with Medication
      HealthPrenatalMedication.hasMany(models.Medication, {
        foreignKey: 'MedicationId',
        as: 'medication'
      });
    }
  }
  HealthPrenatalMedication.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    HealthPrenatalCheckupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthPrenatalCheckups',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    MedicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Medications',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Dosage: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Frequency: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATEONLY,
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
    modelName: 'HealthPrenatalMedication',
    tableName: 'HealthPrenatalMedications',
    timestamps: true
  });
  return HealthPrenatalMedication;
};