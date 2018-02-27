'use strict';
const model = require('../models')

module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    city: DataTypes.STRING
  }, {
    hooks: {
      afterBulkDestroy: (instance) => {
        let SupplierId = instance.where.id;
        sequelize.models.SupplierItem.destroy({where: {SupplierId: SupplierId}})
        .then(() => {})
        .catch(err => console.log(err))
      }
    }
  });
  Supplier.associate = function(models) {
    Supplier.belongsToMany(models.Item, {through: models.SupplierItem}),
    Supplier.hasMany(models.SupplierItem)
  };
  return Supplier;
};