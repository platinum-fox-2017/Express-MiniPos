'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    hooks: {
      beforeBulkDestroy: (instance) => {
        let id = instance.where.id
        sequelize.models.SupplierItem.destroy({
          where: {
            SupplierId: id
          }
        }).then(() => {}).catch(err => {
          console.log(err)
        })
      }
    }
  });
  Supplier.associate = function(models) {
    Supplier.belongsToMany(models.Item, {through: models.SupplierItem})
    Supplier.hasMany(models.SupplierItem)
  };
  return Supplier;
};