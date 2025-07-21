'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthDiseaseIntervention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthDisease
      HealthDiseaseIntervention.belongsTo(models.HealthDisease, {
        foreignKey: 'HealthDiseaseId',
        as: 'healthdisease'
      });

    }
  }
  HealthDiseaseIntervention.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    HealthDiseaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthDiseases',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Type: {
      type: DataTypes.ENUM('Medication', 'Quarantine', 'Home Visit', 'Information Drive')
    },
    Description: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    DateImplemented: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'HealthDiseaseIntervention',
    tableName: 'HealthDiseaseInterventions',
    timestamps: true
  });
  return HealthDiseaseIntervention;
};