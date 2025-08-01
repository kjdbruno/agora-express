'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CalamityAssistance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CalamityAssistance.init({
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    AffectedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CalamityTypes',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    TypeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CalamityTypes',
        key: 'Id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    ProviderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CalamityAssistanceProviders',
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
    modelName: 'CalamityAssistance',
    tableName: 'CalamityAssistances',
    timestamps: true
  });
  return CalamityAssistance;
};