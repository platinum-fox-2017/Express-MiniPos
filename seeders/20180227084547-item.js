'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Items', [{
      name: 'Iphone X',
      brand: 'Apple',
      codeitem: 'HP0234',
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
        name: 'MI 5S',
        brand: 'Xiaomi',
        codeitem: 'SW0923',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Iphone 8',
        brand: 'Apple',
        codeitem: 'HP0876',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Galaxy S8',
        brand: 'Samsung',
        codeitem: 'LP6543',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Q6 Astro Black',
        brand: 'LG',
        codeitem: 'LP0421',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Items', null, {});
  }
};
