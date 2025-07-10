// models/sex.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <--- THIS IS THE REQUIRED FUNCTION EXPORT
  class Sex extends Model {
    static associate(models) {
      // define association here

      // Association with ResidentInformation
      Sex.hasMany(models.ResidentInformation, {
        foreignKey: 'sexId',
        as: 'residentInformations'
      });
      
    }
  }
  Sex.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Sex',
    tableName: 'Sexes',
    timestamps: true, // Sex types usually don't need timestamps
  });
  return Sex;
};