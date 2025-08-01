'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Calamities', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      TypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CalamityTypes',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      StartDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      EndDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      Description: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      CreatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      UpdatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Calamities');
  }
};