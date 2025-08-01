'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CalamityAffecteds', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CalamityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Calamities',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      FamilyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Families',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      IsEvacuated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      Notes: {
        type: Sequelize.TEXT('long'),
        allowNull: true
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
    await queryInterface.dropTable('CalamityAffecteds');
  }
};