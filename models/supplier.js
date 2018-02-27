'use strict';
const model = require('../models')

module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    Name: DataTypes.STRING,
    City: DataTypes.STRING
  }, {
    hooks: {
      beforeBulkDestroy: (user, options) => {
        sequelize.models.SupplierItem.destroy({
          where: {SupplierId: user.where.id}
        }).then(data => {
          console.log(`conjuction record destroyed`, data)
        })
      }
    }
  });
  Supplier.associate = function(models) {
    // associations can be defined here
    Supplier.belongsToMany(models.Item, {through: models.SupplierItem})
    Supplier.hasMany(models.SupplierItem)
  };
  return Supplier;
};