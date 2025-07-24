'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthServiceAvailment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Resident
      HealthServiceAvailment.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident'
      });

      // Association with HealthService
      HealthServiceAvailment.belongsTo(models.HealthService, {
        foreignKey: 'ServiceId',
        as: 'healthservice'
      });

      // Assocition with HealthRecord
      HealthServiceAvailment.hasOne(models.HealthRecord, {
        foreignKey: 'ServiceAvailmentId',
        as: 'healthrecord'
      });

      // Assocition with HealthIllness
      HealthServiceAvailment.hasMany(models.HealthIllness, {
        foreignKey: 'HealthServiceAvailmentId',
        as: 'healthillness'
      });

      // Associstion with HealthMaternalRecord
      HealthServiceAvailment.hasMany(models.HealthMaternalRecord, {
        foreignKey: 'ServiceAvailmentId',
        as: 'maternalrecord'
      });

      // Assocition with HealthImmunization
      HealthServiceAvailment.hasMany(models.HealthImmunization, {
        foreignKey: 'ServiceAvailmentId',
        as: 'healthimmunization'
      });

      // Assocition with HealthIntervention
      HealthServiceAvailment.hasMany(models.HealthIntervention, {
        foreignKey: 'ServiceAvailmentId',
        as: 'healthintervention'
      });

      // Assocition with HealthDisease
      HealthServiceAvailment.hasMany(models.HealthDisease, {
        foreignKey: 'ServiceAvailmentId',
        as: 'healthdisease'
      });
    }
  }
  HealthServiceAvailment.init({
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
    ServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthServices',
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
    modelName: 'HealthServiceAvailment',
    tableName: 'HealthServiceAvailments',
    timestamps: true
  });
  return HealthServiceAvailment;
};