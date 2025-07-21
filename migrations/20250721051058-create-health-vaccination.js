'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthVaccinations', {
      Id: {
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
      VaccineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Vaccines',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Dose: {
        type: Sequelize.FLOAT
      },
      DateScheduled: {
        type: Sequelize.DATEONLY
      },
      DateGiven: {
        type: Sequelize.DATEONLY
      },
      Status: {
        type: Sequelize.ENUM('Pending', 'Given', 'Missed', 'Rescheduled')
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
    await queryInterface.dropTable('HealthVaccinations');
  }
};