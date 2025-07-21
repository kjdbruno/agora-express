'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthDeliveryRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HealthDeliveryRecord.init({
    MaternalRecordId: DataTypes.INTEGER,
    DeliveryDate: DataTypes.DATE,
    DeliveryPlace: DataTypes.STRING,
    DeliveryType: DataTypes.STRING,
    BirthWeight: DataTypes.FLOAT,
    BirthLength: DataTypes.FLOAT,
    ApgarScore: DataTypes.STRING,
    Notes: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'HealthDeliveryRecord',
  });
  return HealthDeliveryRecord;
};