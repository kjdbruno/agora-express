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

      // Association with OfficialSetting
      Resident.hasMany(models.OfficialSetting, {
        foreignKey: 'ResidentId',
        as: 'officialSettings'
      });

      // Association with FamilyMember
      Resident.hasMany(models.FamilyMember, {
        foreignKey: 'ResidentId',
        as: 'familyMembers'
      });

      // Association with BlotterParty
      Resident.hasMany(models.BlotterParty, {
        foreignKey: 'ResidentId',
        as: 'blotterParties'
      });

      // Association with HealthServiceAvailment
      Resident.hasMany(models.HealthServiceAvailment, {
        foreignKey: 'ResidentId',
        as: 'healthserviceavailment'
      });

      // Association with HealthDelivery
      Resident.hasMany(models.HealthDelivery, {
        foreignKey: 'ResidentId',
        as: 'healthdelivery'
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