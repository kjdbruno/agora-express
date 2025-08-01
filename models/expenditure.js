'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Expenditure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Expenditure.init({
    AccountId: DataTypes.INTEGER,
    Payee: DataTypes.STRING,
    Description: DataTypes.STRING,
    Amount: DataTypes.FLOAT,
    Date: DataTypes.DATE,
    DVNo: DataTypes.STRING,
    Notes: DataTypes.STRING,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Expenditure',
  });
  return Expenditure;
};