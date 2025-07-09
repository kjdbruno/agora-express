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
    ResidentId: DataTypes.INTEGER,
    ResidentNo: DataTypes.STRING,
    ResidentCategoryId: DataTypes.INTEGER,
    Birthdate: DataTypes.DATE,
    ZoneId: DataTypes.INTEGER,
    sexId: DataTypes.INTEGER,
    religionId: DataTypes.INTEGER,
    CivilStatusId: DataTypes.INTEGER,
    BloodTypeId: DataTypes.INTEGER,
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