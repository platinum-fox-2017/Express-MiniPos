'use strict';
module.exports = (sequelize, DataTypes) => {
  var Suppliers = sequelize.define('Suppliers', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  });
  Suppliers.associate = models => {
    Suppliers.belongsToMany(models.Items, {
      through: 'SupplierItems',
      foreignKey: 'SupplierId',
    })
  }
  return Suppliers;
}