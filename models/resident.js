'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Resident extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Resident.init({
    Firstname: DataTypes.STRING,
    Middlename: DataTypes.STRING,
    Lastname: DataTypes.STRING,
    Suffix: DataTypes.STRING,
    IsResident: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Resident',
  });
  return Resident;
};