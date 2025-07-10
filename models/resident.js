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

      // Association with ResidentInformation
      Resident.hasOne(models.ResidentInformation, {
        foreignKey: 'ResidentId',
        as: 'residentInformation'
      });
      
    }
  }
  Resident.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    Firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Middlename: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Suffix: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IsResident: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'Resident',
    tableName: 'Residents',
    timestamps: true
  });
  return Resident;
};