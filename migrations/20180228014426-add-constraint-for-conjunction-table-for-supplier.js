'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return  queryInterface.addConstraint('Supplier_Items', ['supplierId'], {
     type: 'foreign key',
     name: 'Conjunction_Supplier',
     references: { //Required field
       table: 'Suppliers',
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
