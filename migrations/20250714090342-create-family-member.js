'use strict';

const { on } = require('nodemailer/lib/xoauth2');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FamilyMembers', {
      Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      RelationshipId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Relationships',
          key: 'Id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      IsHead: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('FamilyMembers');
  }
};