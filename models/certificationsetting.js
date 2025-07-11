'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CertificationSetting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // Association with CertificationType
      CertificationSetting.belongsTo(models.CertificationType, {
        foreignKey: 'CertificationTypeId',
        as: 'certificationType',
      });
      
    }
  }
  CertificationSetting.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    CertificationTypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CertificationTypes',
        key: 'Id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    Cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    Surcharge: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Interest: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Month: {
      type: DataTypes.ENUM,
      values: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    sequelize,
    modelName: 'CertificationSetting',
    tableName: 'CertificationSettings',
    timestamps: true,
  });
  return CertificationSetting;
};