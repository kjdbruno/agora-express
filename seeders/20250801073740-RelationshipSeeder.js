'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const r = [
      "Head",
      "Spouse",
      "Child",
      "Parent",
      "Sibling",
      "Grandparent",
      "Grandchild",
      "Uncle",
      "Aunt",
      "Nephew",
      "Niece",
      "Cousin",
      "In-law",
      "Household Helper",
      "Other Relative",
      "Non-relative"
    ];
    const data = r.map(name => ({
      Name: name,
      CreatedAt: new Date(),
      UpdatedAt: new Date()
    }));
   await queryInterface.bulkInsert('Relationships', data, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Relationships', null, {});
  }
};
