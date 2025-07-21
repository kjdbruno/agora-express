'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthPrenatalMedications', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      HealthPrenatalCheckupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthPrenatalCheckups',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      MedicationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Medications',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Dosage: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      Frequency: {
        type: Sequelize.TEXT('long'),
        allowNull: false
      },
      StartDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      EndDate: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable('HealthPrenatalMedications');
  }
};