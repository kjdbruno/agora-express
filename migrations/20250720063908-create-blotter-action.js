'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BlotterActions', {
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
      Action: {
        type: Sequelize.TEXT('long')
      },
      Date: {
        type: Sequelize.DATE
      },
      Remarks: {
        type: Sequelize.TEXT('long')
      },
      IsActive: {
        type: Sequelize.BOOLEAN,
        defaultValur: true
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
    await queryInterface.dropTable('BlotterActions');
  }
};