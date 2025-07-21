'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthIllness extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Resident
      HealthIllness.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident'
      });

      // Association with Illness
      HealthIllness.hasMany(models.Illness, {
        foreignKey: 'IllnessId',
        as: 'illness'
      });

      // Association with Medication
      HealthIllness.hasMany(models.Medication, {
        foreignKey: 'MedicationId',
        as: 'medication'
      });

    }
  }
  HealthIllness.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    ResidentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Residents',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    IllnessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Illnesses',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    MedicationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Medications',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Dosage: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    Frequency: {
      type: DataTypes.TEXT('long'),
      allowNull: false
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
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
    modelName: 'HealthIllness',
    tableName: 'HealthIllnesses',
    timestamps: true
  });
  return HealthIllness;
};