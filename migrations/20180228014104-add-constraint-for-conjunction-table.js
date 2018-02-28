'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addConstraint('Supplier_Items', ['itemId'], {
     type: 'foreign key',
     name: 'Conjunction_Item',
     references: { //Required field
       table: 'Items',
       field: 'id'
     },
     onDelete: 'cascade',
     onUpdate: 'cascade'
     });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
