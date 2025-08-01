'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CalamityDamages', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      AffectedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CalamityAffecteds',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      TypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CalamityDamageTypes',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Description: {
        type: Sequelize.TEXT('long'),
        allowNull: true
      },
      Loss: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      Severity: {
        type: Sequelize.ENUM('Minor', 'Moderate', 'Severe', 'Total Loss'),
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
    await queryInterface.dropTable('CalamityDamages');
  }
};