'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FamilyMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Family
      FamilyMember.belongsTo(models.Family, {
        foreignKey: 'FamilyId',
        as: 'family'
      });

      // Association with Resident
      FamilyMember.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident'
      });

      // Association with Relationship
      FamilyMember.belongsTo(models.Relationship, {
        foreignKey: 'RelationshipId',
        as: 'relationship'
      });
      
    }
  }
  FamilyMember.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    ResidentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HouseholdMembers',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    RelationshipId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Relationships',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    IsHead: { 
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'FamilyMember',
    tableName: 'FamilyMembers',
    timestamps: true,
  });
  return FamilyMember;
};