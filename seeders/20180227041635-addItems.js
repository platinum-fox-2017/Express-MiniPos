'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
      return queryInterface.bulkInsert('Items', [{
        Name: 'Iphone X',
        Brand: 'Apple',
        CodeItem: 'HP0234',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        Name: 'MI 5S',
        Brand: 'Xiaomi',
        CodeItem: 'SW0923',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        Name: 'Iphone 8',
        Brand: 'Apple',
        CodeItem: 'HP0876',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        Name: 'Galaxy S8',
        Brand: 'Samsung',
        CodeItem: 'LP6543',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        Name: 'Q6 Astro Black',
        Brand: 'LG',
        CodeItem: 'LP0421',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
