'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalamityDamage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalamityDamage.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    AffectedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CalamityTypes',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    TypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CalamityTypes',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Description: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    Loss: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Severity: {
      type: DataTypes.ENUM('Minor', 'Moderate', 'Severe', 'Total Loss'),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'CalamityDamage',
    tableName: 'CalamityDamages',
    timestamps: true
  });
  return CalamityDamage;
};