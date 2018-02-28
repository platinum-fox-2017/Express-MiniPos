'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {});
  Supplier.associate = function(models) {
    Supplier.hasMany(models.SupplierItem, { foreignKey: 'SupplierId' })
    Supplier.belongsToMany(models.Item, { through: 'models.SupplierItem', foreignKey:'SupplierId'})
  };
  return Supplier;
};