'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ResidentInformations', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ResidentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ResidentNo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ResidentCategoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Birthdate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ZoneId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sexId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      religionId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      CivilStatusId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      BloodTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      EducationalAttainmentId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      OccupationId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      NationalityId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Income: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      ContactNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Email: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PhilsysNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PrecintNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      SSSNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      GSISNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      PagibigNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      Tin: {
        type: Sequelize.STRING, 
        allowNull: true
      },
      PhilhealthNo: {
        type: Sequelize.STRING,
        allowNull: true
      },
      IsPWD: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      IsIndigent: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      is4Ps: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isSoloParent: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      isDeceased: {
        type: Sequelize.BOOLEAN,
        allowNull: false
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
    await queryInterface.dropTable('ResidentInformations');
  }
};