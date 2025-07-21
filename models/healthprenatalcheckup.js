'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthPrenatalCheckup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HealthPrenatalCheckup.init({
    MaternalRecordId: DataTypes.INTEGER,
    HealthRecordId: DataTypes.INTEGER,
    GestationAge: DataTypes.FLOAT,
    FundicHeight: DataTypes.FLOAT,
    HasHeartbeat: DataTypes.BOOLEAN,
    Complaints: DataTypes.STRING,
    AdviceGiven: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'HealthPrenatalCheckup',
  });
  return HealthPrenatalCheckup;
};