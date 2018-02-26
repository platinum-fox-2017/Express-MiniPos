'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {});
  Supplier.associate = models=>{
    Supplier.belongsToMany(models.Item,{
      through:'SupplierItem',
      foreignKey: 'ItemId'      
    })
  }
  return Supplier;
};