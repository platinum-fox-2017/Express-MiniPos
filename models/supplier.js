'use strict';
module.exports = (sequelize, DataTypes) => {
  var Supplier = sequelize.define('Supplier', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {hooks: {
      beforeBulkDestroy: (user, options) => {
        sequelize.models.SupplierItem.destroy({
          where: {SupplierId: user.where.id}
        })
      }
    }});
  Supplier.associate = function(models) {
    Supplier.belongsToMany(models.Item,{through:models.SupplierItem});
  };
  return Supplier;
};
