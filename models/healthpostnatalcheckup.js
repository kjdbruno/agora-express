'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthPostnatalCheckup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HealthPostnatalCheckup.init({
    MaternalRecordId: DataTypes.INTEGER,
    Purpose: DataTypes.STRING,
    Findings: DataTypes.STRING,
    Intervention: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'HealthPostnatalCheckup',
  });
  return HealthPostnatalCheckup;
};