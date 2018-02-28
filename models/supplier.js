'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    city: DataTypes.STRING
  });
  Supplier.associate = function (models) {
  Supplier.belongsToMany(models.Item, {
    through: 'Supplier_Item',
    foreignKey: 'supplierId',
    otherKey: 'itemId'
    });
  };
  return Supplier;
};
