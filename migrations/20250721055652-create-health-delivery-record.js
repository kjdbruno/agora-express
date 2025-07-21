'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthDeliveryRecords', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      HealthMaternalRecordId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthMaternalRecords',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      DeliveryDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      DeliveryPlace: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      DeliveryType: {
        type: Sequelize.ENUM('Normal Spontaneous', 'Caesarian', 'Assisted')
      },
      BirthWeight: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      BirthLength: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      ApgarScore: { // Apgar rating for newborn health (e.g., “8/10”).
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      Notes: {
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
    await queryInterface.dropTable('HealthDeliveryRecords');
  }
};