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
   await queryInterface.bulkInsert('EducationalAttainments', [
      { Name: 'No Formal Education', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Elementary Level', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Secodary Level', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Technical-Vocational or Non-Degree Program', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Tertiary Level', CreatedAt: new Date(), UpdatedAt: new Date() },
      { Name: 'Postgraduate Studies', CreatedAt: new Date(), UpdatedAt: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('EducationalAttainments', null, {});
  }
};
