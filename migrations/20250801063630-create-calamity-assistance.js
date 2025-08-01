'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CalamityAssistances', {
      id: {
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
          model: 'CalamityAssistanceTypes',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      Quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      Amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      Date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      ProviderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'CalamityAssistanceProviders',
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
    await queryInterface.dropTable('CalamityAssistances');
  }
};