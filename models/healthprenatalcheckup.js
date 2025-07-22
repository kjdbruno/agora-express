'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthPrenatalCheckup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthMaternalRecord
      HealthPrenatalCheckup.belongsTo(models.HealthMaternalRecord, {
        foreignKey: 'MaternalRecordId',
        as: 'healthmaternalrecord'
      });

      // Association with HealthPrenatalMedication
      HealthPrenatalCheckup.hasMany(models.HealthPrenatalMedication, {
        foreignKey: 'HealthPrenatalChackupId',
        as: 'healthprenatalmedication'
      });

    }
  }
  HealthPrenatalCheckup.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    MaternalRecordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'HealthMaternalRecords',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    GestationAge: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    FundicHeight: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    HasHeartbeat: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    Complaints: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    Intervention: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'HealthPrenatalCheckup',
    tableName: 'HealthPrenatalCheckups',
    timestamps: true
  });
  return HealthPrenatalCheckup;
};