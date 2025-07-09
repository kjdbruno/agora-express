// models/user.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => { // <--- THIS IS THE REQUIRED FUNCTION EXPORT
  class User extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  User.init({
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    EmployeeNo: {
      type: DataTypes.STRING,
      allowNull: true, // Assuming EmployeeNo is an optional field
      unique: true // Assuming EmployeeNo should be unique
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Roles', // Assuming you have a Roles table
        key: 'Id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  });
  return User;
};