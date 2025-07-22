'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthPostnatalMedication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthPostnatalCheckup
      HealthPostnatalMedication.belongsTo(models.HealthPostnatalCheckup, {
        foreignKey: 'HealthPostnatalCheckupId',
        as: 'healthpostnatalmedication'
      });

      // Association with Medication
      HealthPostnatalMedication.hasMany(models.Medication, {
        foreignKey: 'MedicationId',
        as: 'medication'
      });

    }
  }
  HealthPostnatalMedication.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    HealthPostnatalCheckupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthPostnatalCheckups',
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
    modelName: 'HealthPostnatalMedication',
    tableName: 'HealthPostnatalMedications',
    timestamps: true
  });
  return HealthPostnatalMedication;
};