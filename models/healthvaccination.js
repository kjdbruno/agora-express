'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthVaccination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Resident
      HealthVaccination.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident'
      });

      // Assocition with Vaccine
      HealthVaccination.belongsTo(models.Vaccine, {
        foreignKey: 'VaccineId',
        as: 'vaccine'
      });

      // Association with OfficialSetting
      HealthVaccination.belongsTo(models.OfficialSetting, {
        foreignKey: 'OfficialId',
        as: 'official'
      });

    }
  }
  HealthVaccination.init({
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
    VaccineId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Vaccines',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Dose: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    DateScheduled: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DateGiven: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Status: {
      type: DataTypes.ENUM('Pending', 'Given', 'Missed', 'Rescheduled'),
      allowNull: false
    },
    OfficialId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'OfficialSettings',
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
    modelName: 'HealthVaccination',
    tableName: 'HealthVaccinations',
    timestamps: true
  });
  return HealthVaccination;
};