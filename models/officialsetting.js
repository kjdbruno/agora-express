'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OfficialSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Resident
      OfficialSetting.belongsTo(models.Resident, {
        foreignKey: 'ResidentId',
        as: 'resident',
      });

      // Association with Position
      OfficialSetting.belongsTo(models.Position, {
        foreignKey: 'PositionId',
        as: 'position',
      });

      // Association with BarangaySetting
      OfficialSetting.belongsTo(models.BarangaySetting, {
        foreignKey: 'BarangaySettingId',
        as: 'barangaySetting',
      });
    }
  }
  OfficialSetting.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    BarangaySettingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BarangaySettings',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    ResidentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Residents',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    PositionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Positions',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    Signature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsSignatory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'OfficialSetting',
    tableName: 'OfficialSettings',
    timestamps: true,
  });
  return OfficialSetting;
};