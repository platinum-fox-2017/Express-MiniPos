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
    return queryInterface.bulkInsert('SupplierItems', [{
      SupplierId: 4,
      ItemId: 5,
      price: 50000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      SupplierId: 4,
      ItemId: 3,
      price: 53000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      SupplierId: 2,
      ItemId: 8,
      price: 34000,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      SupplierId: 2,
      ItemId: 2,
      price: 47500,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      SupplierId: 1,
      ItemId: 7,
      price: 59999,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('SupplierItems', null, {});
  }
};
