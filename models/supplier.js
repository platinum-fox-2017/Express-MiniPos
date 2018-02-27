'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    // hook
    hooks:{
      afterDestroy: (instance, options) => {
        // instance.id
        db.SupplierItem.destroy({
          where:{
            SupplierId: instance.id
          }
        })
      }
    }
  });
  Supplier.associate = function(models) {
    // associations can be defined here
    Supplier.belongsToMany(models.Item , { through: models.SupplierItem })
    Supplier.hasMany(models.SupplierItem)
  };
  return Supplier;
};
