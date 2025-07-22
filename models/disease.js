'use strict';
const {
  Model
} = require('sequelize');
const { HealthDisease } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with DiseaseSymptom
      Disease.hasMany(models.DiseaseSymptom, {
        foreignKey: 'DiseaseId',
        as: 'symptoms'
      });

      // Association with HealthDisease
      Disease.hasMany(models.HealthDisease, {
        foreignKey: 'DiseaseId',
        as: 'healthdisease'
      });
      
    }
  }
  Disease.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    modelName: 'Disease',
    tableName: 'Diseases',
    timestamps: true
  });
  return Disease;
};