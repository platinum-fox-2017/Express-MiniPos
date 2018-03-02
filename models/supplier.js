'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    city: DataTypes.STRING
  });
  Supplier.associate = function (models) {
    Supplier.hasMany(models.SupplierItem, { foreignKey: 'supplierId' })
    Supplier.belongsToMany(models.Item, { through: 'models.SupplierItem', foreignKey: 'supplierId' })
  };
  return Supplier;
};