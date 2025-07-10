'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResidentInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ResidentInformation.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ResidentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Residents',
        key: 'Id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    ResidentNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [1, 50] // Adjust length as needed
      }
    },
    ResidentCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ResidentCategories',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    Birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isBefore: new Date().toISOString() // Ensure birthdate is in the past
      }
    },
    ZoneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      reference: {
        model: 'Zones',
        key: 'Id'
      },
      omDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    sexId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Sexes',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    religionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Religions', 
        key: 'Id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    CivilStatusId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CilvilStatuses',
        key: 'Id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    },
    BloodTypeId: {
      type: DataTypes.INTEGER,
    },
    EducationalAttainmentId: DataTypes.INTEGER,
    OccupationId: DataTypes.INTEGER,
    NationalityId: DataTypes.INTEGER,
    Income: DataTypes.FLOAT,
    ContantNo: DataTypes.STRING,
    Email: DataTypes.STRING,
    PhilsysNo: DataTypes.STRING,
    PrecintNo: DataTypes.STRING,
    SSSNo: DataTypes.STRING,
    GSISNo: DataTypes.STRING,
    PagibigNo: DataTypes.STRING,
    Tin: DataTypes.STRING,
    PhilhealthNo: DataTypes.STRING,
    IsPWD: DataTypes.BOOLEAN,
    IsIndigent: DataTypes.BOOLEAN,
    is4Ps: DataTypes.BOOLEAN,
    isSoloParent: DataTypes.BOOLEAN,
    isDeceased: DataTypes.BOOLEAN,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ResidentInformation',
  });
  return ResidentInformation;
};