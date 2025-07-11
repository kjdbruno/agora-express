'use strict';

const { Resident, BarangaySetting } = require('../models');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OfficialSettings', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BarangaySettingId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'BarangaySettings',
          key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      ResidentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Residents',
          key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      PositionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Positions',
          key: 'Id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      Signature: {
        type: Sequelize.STRING
      },
      IsSignatory: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('OfficialSettings');
  }
};