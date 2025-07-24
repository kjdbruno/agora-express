'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthIntervention extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Assocition with HealthServiceAvailment
      HealthIntervention.belongsTo(models.HealthServiceAvailment, {
        foreignKey: 'ServiceAvailmentId',
        as: 'healthserviceavailment'
      });

      // Assocition with Mediaction
      HealthIntervention.belongsTo(models.Medication, {
        foreignKey: 'MedicationId',
        as: 'medication'
      });
    }
  }
  HealthIntervention.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    Type: {
      type: DataTypes.ENUM('Medication', 'Quarantine', 'Home Visit', 'Information Drive'),
      allowNull: false
    },
    MedicationId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Medications',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Dosage: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    Frequency: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
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
    modelName: 'HealthIntervention',
    tableName: 'HealthInterventions',
    timestamps: true
  });
  return HealthIntervention;
};