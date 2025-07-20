'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlotterType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Blotter
      BlotterType.hasMany(models.Blotter, {
        foreignKey: 'BlotterTypeId',
        as: 'blotters'
      });
    }
  }
  BlotterType.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'BlotterType',
    tableName: 'BlotterTypes',
    timestamps: true,
  });
  return BlotterType;
};