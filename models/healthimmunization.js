'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HealthImmunization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with HealthServiceAvailment
      HealthImmunization.belongsTo(models.HealthServiceAvailment, {
        foreignKey: 'ServiceAvailmentId',
        as: 'healthserviceavailment'
      });

      // Assocition with Vaccine
      HealthImmunization.belongsTo(models.Vaccine, {
        foreignKey: 'VaccineId',
        as: 'vaccine'
      });

      // Assocition with OfficeSetting
      HealthImmunization.belongsTo(models.OfficialSetting, {
        foreignKey: 'OfficialId',
        as: 'official'
      });
    }
  }
  HealthImmunization.init({
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
    Dosage: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ScheduleDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    GivenDate: {
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
    modelName: 'HealthImmunization',
    tableName: 'HealthImmunizations',
    timestamps: true
  });
  return HealthImmunization;
};