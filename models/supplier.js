'use strict';
module.exports = (sequelize, DataTypes) => {
  var supplier = sequelize.define('supplier', {
    name: DataTypes.STRING,
    city: DataTypes.STRING
  })

  supplier.associate = function(models){
    supplier.belongsToMany(models.item,{
      through : 'supplierItem',
      foreignKey : 'supplierId'
    })

    supplier.hasMany(models.supplierItem,{foreignKey : 'supplierId'})
  }

  return supplier;
};