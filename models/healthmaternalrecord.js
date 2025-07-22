'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthMaternalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Resident
      HealthMaternalRecord.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident'
      });

      // Assocition with HealthPrenatalCheckup
      HealthMaternalRecord.hasMany(models.HealthPrenatalCheckup, {
        foreignKey: 'MaternalRecordId',
        as: 'healthprenatalcheckup'
      });

      // Association with HealthDeliveryRecord
      HealthMaternalRecord.hasMany(models.HealthDeliveryRecord, {
        foreignKey: 'MaternalRecordId',
        as: 'healthdeliveryrecord'
      });

      //Association with HealthPostnatalCheckup
      HealthMaternalRecord.hasMany(models.HealthPostnatalCheckup, {
        foreignKey: 'MaternalRecordId',
        as: 'healthpostnatalcheckup'
      });

    }
  }
  HealthMaternalRecord.init({
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
        model: 'Resident',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    LMP: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    EDD: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    IsHighRisk: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    RiskFactors: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    Status: {
      type: DataTypes.ENUM('Ongoing', 'Delivered', 'Aborted'),
      allowNull: false
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'HealthMaternalRecord',
    tableName: 'HealthMaternalRecords',
    timestamps: true
  });
  return HealthMaternalRecord;
};