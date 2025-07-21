'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiseaseSymptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Disease
      DiseaseSymptom.belongsTo(models.Disease, {
        foreignKey: 'DiseaseId',
        as: 'disease'
      });

    }
  }
  DiseaseSymptom.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    DiseaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Diseases',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    modelName: 'DiseaseSymptom',
    tableName: 'DiseaseSymptoms',
    timestamps: true
  });
  return DiseaseSymptom;
};