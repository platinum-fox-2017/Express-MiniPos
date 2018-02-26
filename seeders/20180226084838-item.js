'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [
    {
      name: 'Iphone X',
      brand: 'Apple',
      codeItem :'HP0234',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'MI 5S',
      brand: 'Xiaomi',
      codeItem :'SW0923',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Iphone 8',
      brand: 'Apple',
      codeItem :'HP0876',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Galaxy S8',
      brand: 'Samsung',
      codeItem :'LP6543',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Q6 Astro Black',
      brand: 'LG',
      codeItem :'LP0421',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], {});
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
