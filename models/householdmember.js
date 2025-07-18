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

      // Association with Household
      HouseholdMember.belongsTo(models.Household, {
        foreignKey: 'HouseholdId',
        as: 'household'
      });

      // Association with Family
      HouseholdMember.belongsTo(models.Family, {
        foreignKey: 'FamilyId',
        as: 'family'
      });
      
    }
  }
  HouseholdMember.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    HouseholdId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Households',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    FamilyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Families',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
  }, {
    sequelize,
    modelName: 'HouseholdMember',
    tableName: 'HouseholdMembers',
    timestamps: true,
  });
  return HouseholdMember;
};