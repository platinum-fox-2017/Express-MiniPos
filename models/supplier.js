'use strict';
module.exports = (sequelize, DataTypes) => {
  var supplier = sequelize.define('supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {});
  supplier.associate = function(models) {
    supplier.belongsToMany(models.item,{through:models.supppplieritem,foreignKey:'supplier_Id'})
    supplier.hasMany(models.supppplieritem,{foreignKey:'supplier_Id'})
  };
  return supplier;
};
