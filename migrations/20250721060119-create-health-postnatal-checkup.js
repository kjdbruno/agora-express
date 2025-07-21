'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthPostnatalCheckups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HealthRecordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthRecords',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      MaternalRecordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthMaternalRecords',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Purpose: {
        type: Sequelize.TEXT('long')
      },
      Findings: {
        type: Sequelize.TEXT('long')
      },
      Intervention: {
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
    await queryInterface.dropTable('HealthPostnatalCheckups');
  }
};