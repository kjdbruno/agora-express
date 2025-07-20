'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BlotterHandlers', {
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
      OfficialId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'OfficialSettings',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Role: {
        type: Sequelize.ENUM('Presiding Officer', 'Investigator', 'Mediator', 'Arbitrator')
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
    await queryInterface.dropTable('BlotterHandlers');
  }
};