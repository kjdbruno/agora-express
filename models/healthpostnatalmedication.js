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
    }
  }
  HealthPostnatalMedication.init({
    HealthPostnatalCheckupId: DataTypes.INTEGER,
    MedicationId: DataTypes.INTEGER,
    Dosage: DataTypes.FLOAT,
    Frequency: DataTypes.FLOAT,
    StartDate: DataTypes.DATE,
    EndDate: DataTypes.DATE,
    Notes: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'HealthPostnatalMedication',
  });
  return HealthPostnatalMedication;
};