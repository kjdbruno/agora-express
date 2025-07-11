'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CertificationType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with CertificationSetting
      CertificationType.hasMany(models.CertificationSetting, {
        foreignKey: 'CertificationTypeId',
        as: 'certificationSettings',
      });
      
    }
  }
  CertificationType.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IsBusiness: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    IsCedula: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    IsCustom: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'CertificationType',
    tableName: 'CertificationTypes',
    timestamps: true,
  });
  return CertificationType;
};