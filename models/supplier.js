'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, 
  { 
    hooks : {
    afterDestroy: (instance) => {
      sequelize.models.SupplierItem.destroy({    
        where : {SupplierId : instance.id}
      })
    }
  }});
  Supplier.associate = function(models) {
    Supplier.belongsToMany(models.Item,{through : models.SupplierItem});
    Supplier.hasMany(models.SupplierItem);
  };
  return Supplier;
};