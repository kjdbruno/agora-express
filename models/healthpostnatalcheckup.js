'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthPostnatalCheckup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthMaternalRecord
      HealthPostnatalCheckup.belongsTo(models.HealthMaternalRecord, {
        foreignKey: 'MaternalRecordId',
        as: 'healthmaternalrecord'
      });

      // Association with HealthPostnatalMedication
      HealthPostnatalCheckup.hasMany(models.HealthPostnatalMedication, {
        foreignKey: 'HealthPostnatalChackupId',
        as: 'healthpostnatalmedication'
      });

    }
  }
  HealthPostnatalCheckup.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
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
    Purpose: {
      type: DataTypes.TEXT('long'),
      allowNull: true
    },
    Findings: {
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
    modelName: 'HealthPostnatalCheckup',
    tableName: 'HealthPostnatalCheckups',
    timestamps: true
  });
  return HealthPostnatalCheckup;
};