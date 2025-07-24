'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthDisease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthServiceAvailment
      HealthDisease.belongsTo(models.HealthServiceAvailment, {
        foreignKey: 'ServiceAvailmentId',
        as: 'healthserviceavailment'
      });

      // Association with Disease
      HealthDisease.belongsTo(models.Disease, {
        foreignKey: 'DiseaseId',
        as: 'disease'
      });

    }
  }
  HealthDisease.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    ServiceAvailmentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthServiceAvailments',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
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
    DiagnosisDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    OnsetDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Status: {
      type: DataTypes.ENUM('Ongoing', 'Recovered', 'Deceased')
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
    modelName: 'HealthDisease',
    tableName: 'HealthDiseases',
    timestamps: true
  });
  return HealthDisease;
};