'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medication extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthIllness
      Medication.belongsTo(models.HealthIllness, {
        foreignKey: 'MedicationId',
        as: 'healthmedication'
      });

      // Association with HealthDiseaseMedication
      Medication.belongsTo(models.HealthDiseaseMedication, {
        foreignKey: 'MedicationId',
        as: 'healthdiseasemedication'
      });

      // Association with HealthPrenatalMedication
      Medication.belongsTo(models.HealthPrenatalMedication, {
        foreignKey: 'MedicationId',
        as: 'healthprenatalmedication'
      });

      // Association with HealthPostnatalMedication
      Medication.belongsTo(models.HealthPostnatalMedication, {
        foreignKey: 'MedicationId',
        as: 'healthpostnatalmedication'
      });

    }
  }
  Medication.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    modelName: 'Medication',
    tableName: 'Medications',
    timestamps: true
  });
  return Medication;
};