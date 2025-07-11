'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BarangaySetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with Barangay
      BarangaySetting.belongsTo(models.Barangay, {
        foreignKey: 'BarangayId',
        as: 'barangay'
      });

      // Association with Town
      BarangaySetting.belongsTo(models.Town, {
        foreignKey: 'TownId',
        as: 'town'
      });

      // Association with Province
      BarangaySetting.belongsTo(models.Province, {
        foreignKey: 'ProvinceId',
        as: 'province'
      });

      // Association with OfficialSetting
      BarangaySetting.hasMany(models.OfficialSetting, {
        foreignKey: 'BarangaySettingId',
        as: 'officialSettings',
      });
    }
  }
  BarangaySetting.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    Seal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    BarangayId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Barangays',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    TownId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Towns',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    ProvinceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Provinces',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'BarangaySetting',
    tableName: 'BarangaySettings',
    timestamps: true,
  });
  return BarangaySetting;
};