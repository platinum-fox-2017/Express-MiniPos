'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    city: DataTypes.STRING
  }, {});
  Supplier.associate = function (models) {
    // associations can be defined here
    Supplier.belongsToMany(models.Item, { through: 'SupplierItems', foreignKey: 'supplierId' });
  };
  return Supplier;
};