'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BlotterParties', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BlotterId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Blotters',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      ResidentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Residents',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Role: {
        type: Sequelize.ENUM('Complainant', 'Respondent', 'Witness')
      },
      Statement: {
        type: Sequelize.TEXT('long')
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
    await queryInterface.dropTable('BlotterParties');
  }
};