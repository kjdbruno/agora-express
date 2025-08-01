'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalamityAffected extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalamityAffected.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    CalamityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CalamityTypes',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    FamilyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CalamityTypes',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    IsEvacuated: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    Notes: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'CalamityAffected',
    tableName: 'CalamityAffecteds',
    timestamps: true
  });
  return CalamityAffected;
};