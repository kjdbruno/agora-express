'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalamityEvacuation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalamityEvacuation.init({
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
    EvacuationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EvacuationCenters',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'CalamityEvacuation',
    tableName: 'CalamityEvacuations',
    timestamps: true
  });
  return CalamityEvacuation;
};