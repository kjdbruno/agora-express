'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthMaternalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HealthMaternalRecord.init({
    ResidentId: DataTypes.INTEGER,
    LMP: DataTypes.DATE,
    EDD: DataTypes.DATE,
    IsHighRisk: DataTypes.BOOLEAN,
    ReskFactors: DataTypes.STRING,
    Status: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'HealthMaternalRecord',
  });
  return HealthMaternalRecord;
};