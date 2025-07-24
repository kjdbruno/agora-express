'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('HealthImmunizations', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ServiceAvailmentId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'HealthServiceAvailments',
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
      Dosage: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      ScheduleDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      GivenDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      Status: {
        type: Sequelize.ENUM('Pending', 'Given', 'Missed', 'Rescheduled'),
        allowNull: false
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
    await queryInterface.dropTable('HealthImmunizations');
  }
};