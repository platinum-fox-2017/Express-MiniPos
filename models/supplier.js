'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    Name: DataTypes.STRING,
    Kota: DataTypes.STRING
  }, {});
  Supplier.associate = function(models) {
    // associations can be defined here
    Supplier.belongsToMany(models.Item, {through: models.SupplierItem});
    Supplier.hasMany(models.SupplierItem);
  };
  return Supplier;
};