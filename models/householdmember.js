'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HouseholdMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  HouseholdMember.init({
    HouseholdId: DataTypes.INTEGER,
    FamilyId: DataTypes.INTEGER,
    IsActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'HouseholdMember',
  });
  return HouseholdMember;
};